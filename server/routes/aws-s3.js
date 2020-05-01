const express = require("express");
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
const router = express.Router();
const AWS = require("aws-sdk");


AWS.config = new AWS.Config({
    accessKeyId: process.env.awsAccessKey,
    secretAccessKey:process.env.awsSecretAccessKey,
    region:process.env.awsBucketRegion,
})

const s3 = new AWS.S3()
const Bucket = process.env.awsBucket


// GET URL Generator
function generateGetUrl(Key) {
    return new Promise((resolve, reject) => {
      const params = { Bucket, Key, Expires: 60 };
      // Note operation in this case is getObject
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err){
            console.log(err)
            reject(err)} 
        else resolve(url);
      });
    });
}

function generatePutUrl(Key, ContentType) {
    return new Promise((resolve, reject) => {
      // Note Bucket is retrieved from the env variable above.
      
      const params = { Bucket, Key, ContentType };
    //   console.log(params)
      // Note operation in this case is putObject
      s3.getSignedUrl('putObject', params, function(err, url) {
        if (err) {
            console.log(err)
          return reject(err);
        }
        // If there is no errors we can send back the pre-signed PUT URL
        return resolve(url);
      });
    });
  }

// GET URL
router.get('/generate-get-url', (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { Key } = req.query;
    generateGetUrl(Key)
      .then(getURL => {      
        res.send(getURL);
      })
      .catch(err => {
        //   console.log(err)
        res.send(err);
      });
});

// PUT URL
router.get('/generate-put-url', (req,res)=>{
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType } =  req.query;
    console.log(req.query)
    generatePutUrl(Key, ContentType).then(putURL => {
      res.send({putURL});
    })
    .catch(err => {
      res.send(err);
    });
  });

// const s3 = new AWS.S3({
//   accessKeyId: process.env.awsUserKey, // aws access id here
//   region: "us-east-2",
//   acl: 'public-read',
//   secretAccessKey: process.env.awsUserSecretKey, // aws secret access key here
// });

/**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: process.env.awsBucket,
     key: function (req, file, cb) {
         console.log(req.body)
      cb(null, path.basename( req.body.contactId) + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
}).single('profileImage');




/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */

// const s3Upload = (req, res, next) => {
//     profileImgUpload(req, res, (err) => {
//         if(err) return res.status(500).send({err})
        
//     })
// }

router.post( '/profile-img-upload', ( req, res ) => {
    // console.log(req.body)
    profileImgUpload( req, res, ( error ) => {
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
       } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
    // Save the file name into database into profile model
    res.json( {
         image: imageName,
         location: imageLocation
        } );
       }
      }
     });
    });

// api endpoint to get signed url
// router.get("/get-signed-url", (req, res) => {
//   const fileurls = [];
//   s3.getSignedUrl("putObject", params, function (err, url) {
//     if (err) {
//         console.log(err)
//       console.log("Error getting presigned url from AWS S3");
//       res.json({
//         success: false,
//         message: "Pre-Signed URL error",
//         urls: fileurls,
//       });
//     } else {
//       fileurls[0] = url;
//       console.log("Presigned URL: ", fileurls[0]);
//       res.json({
//         success: true,
//         message: "AWS SDK S3 Pre-signed urls generated successfully.",
//         urls: fileurls,
//       });
//     }
//   });
// });


// router.get("/signPut", (req, res) => {
//     // const contentType = req.query.contentType;
//     console.log('working ====> ')
// 	// Validate the content type
// 	// if (!contentType.startsWith("image/")) {
// 	// 	throw new Error("must be image/");
// 	// }
// 	const userId = req.session.userId; // some kind of auth

// 	// check if the user is authorized to upload!

// 	const url = s3.getSignedUrl("putObject", {
// 		Bucket: process.env.awsBucket, // make it configurable
// 		Key: `${userId}`, // random with user id
// 		ContentType: "image/",
// 		// can not set restrictions to the length of the content
//     });
//     // console.log(url)
//     return res.json({url});
//     // return res.end()
// });

module.exports = router;