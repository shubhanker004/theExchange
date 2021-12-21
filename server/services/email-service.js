const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const registerEmail = async(userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();

    let mailGenerator = new Mailgen ({
      theme:"default",
      product: {
        name: "The Exchange",
        link: `${process.env.EMAIL_MAIL_URL}`
      }
    });

    const email = {
      body: {
        name: userEmail,
        intro: "Welcome to The Exchange. We are excited to do business with you.",
        action: {
          instructions: "To get started, please confirm your account below:",
          button: {
            color: '#0492c2',
            text: "Confirm your account",
            link: `${process.env.SITE_DOMAIN}/verification?t=${emailToken}`
          }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    }

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject:"Welcome to The Exchange!",
      html: emailBody
    };

    await transporter.sendMail(message);
    return true;

  } catch(error) {
    throw error;
  }
};


const registerUpdatedEmail = async(userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();

    let mailGenerator = new Mailgen ({
      theme:"default",
      product: {
        name: "The Exchange",
        link: `${process.env.EMAIL_MAIL_URL}`
      }
    });

    const email = {
      body: {
        name: userEmail,
        intro: "We got a request to update your email address.",
        action: {
          instructions: "Please confirm your updated email below:",
          button: {
            color: '#0492c2',
            text: "Update Email",
            link: `${process.env.SITE_DOMAIN}/verification?t=${emailToken}`
          }
        },
        outro: 'If you did not request it, please disregard his email.'
      }
    }

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject:"Request to update the email address.",
      html: emailBody
    };

    await transporter.sendMail(message);
    return true;

  } catch(error) {
    throw error;
  }
};


module.exports = { registerEmail, registerUpdatedEmail };