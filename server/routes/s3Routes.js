const express = require("express");
const AWS = require("aws-sdk");
const { asyncHandler } = require("./helper/asyncHandler");
const router = express.Router();

AWS.config = new AWS.Config({
  accessKeyId: process.env.awsAccessKey,
  secretAccessKey: process.env.awsSecretAccessKey,
  region: process.env.awsBucketRegion,
});

const s3 = new AWS.S3();
const Bucket = process.env.awsBucket;

// GET URL Generator
function generateGetUrl(Key) {
  return new Promise((resolve, reject) => {
    const params = { Bucket, Key, Expires: 60 };
    // Note operation in this case is getObject

    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) reject(err);
      else resolve(url);
    });
  });
}

// PUT URL Generator
function generatePutUrl(Key, ContentType) {
  return new Promise((resolve, reject) => {
    // Note Bucket is retrieved from the env variable above.
    const params = { Bucket, Key, ContentType };

    // Note operation in this case is putObject
    s3.getSignedUrl("putObject", params, function (err, url) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      // If there is no errors we can send back the pre-signed PUT URL
      return resolve(url);
    });
  });
}

// PUT URL Generator
function deleteS3Obj(Key) {
  return new Promise((resolve, reject) => {
    // Note Bucket is retrieved from the env variable above.
    const params = { Bucket, Key };

    // Note operation in this case is putObject
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      // If there is no errors we can send back the pre-signed PUT URL
      return resolve(data);
    });
  });
}

// GET URL
router.get(
  "/generate-get-url",
  asyncHandler(async (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { Key } = req.query;
    const getURL = await generateGetUrl(Key);
    return res.send(getURL);
  })
);

// PUT URL
router.get(
  "/generate-put-url",
  asyncHandler(async (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { Key, ContentType } = req.query;

    const putURL = await generatePutUrl(Key, ContentType);
    return res.send({ putURL });
  })
);

router.delete("/delete-object/:Key", asyncHandler(async(req, res) => {
    // Key refers to the remote name of the file.
    const  Key = req.params.Key;
    
    deleteS3Obj(Key);
    res.end()
  })
);

module.exports = router;
