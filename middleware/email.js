const nodemailer = require("nodemailer")

const MailSending = (options) =>{
    const transporter =  nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth:{
            user:"7b847c15c15ca2",
            pass: "d7a4e8367647b1"
        },
        // secure: false
    })

    const emailOptions = {
        from: "codarhq@gmail.com",
        to:options.email,
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(emailOptions, (err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Email sent: " + info.response)
        }
    })
}

// async function twilio(phoneNumber, otpCode){
//     // Download the helper library from https://www.twilio.com/docs/node/install
// // Set environment variables for your credentials
// // Read more at http://twil.io/secure
// const accountSid = "AC4b7cbfc9f80a9c905176509d0f8f70ca";
// const authToken = "4f37b0f99ceb2b94bfdd7bf09189d237";
// const verifySid = "VA1cf40ebecf40ea4ad136fcd38f38c712";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+2349032099892", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+2349032099892", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
// }

module.exports = {MailSending}