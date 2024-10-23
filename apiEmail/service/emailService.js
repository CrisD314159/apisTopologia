import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'perry.farrell85@ethereal.email',
      pass: '3Rp2GueEepjPa66nz6'
  }
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(email, message, subject ) {
  if(!email || !message || !subject) {
    throw new Error('Missing required fields')
  }
 try {
   // send mail with defined transport object
   const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
 } catch (error) {
    throw new Error('Internal server error')
  
 }
}