const nodemailer = require("nodemailer");

module.exports = async(email, token) => {
    let transporter = nodemailer.createTransport({
        host: process.env.hostEmail,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.hostEmailUser, // generated ethereal user
          pass: process.env.hostEmailPassword // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Contact Manager" <donotreply@alexjnunez.com>', // sender address
        to: email, // list of receivers
        subject: "Account Password Recovery", // Subject line
        html: `<p>Hi I heard that you for forgot your password. No problem!</p>
         <p>Here is your password recovery token: <b>${token}</b> </p>
         <p>This token will expire in 1 hour if not used</p>
         <p>Thanks,<br/>Alex Nunez</p>`
      }, (err) => {
          console.log(err)
      });
}