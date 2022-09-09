const nodemailer = require('nodemailer')

// SEND CONFIRMATION EMAIL
const transport = async (email, date, id) => {
  const confirmation = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  await confirmation.sendMail({
    from: 'reservations@lamere.com',
    to: email,
    subject: 'Your reservation at La Mère is confirmed',
    html:
      '<h3>We look forward to welcoming you to La Mére ' +
      date +
      '</h3>' +
      '<p>If you would like to cancel your reservation, click <a href="http://localhost:3000/booking_cancelation/' +
      id +
      '">here</a>.</p>',
  })
}

module.exports = { transport }
