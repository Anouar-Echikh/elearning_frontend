import React, { Component } from "react";
import nodemailer from "nodemailer";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { emailSender, emailReceiver, subject, code } = this.props;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anouar.chikh@gmail.com",
        pass: "anouar12369"
      }
    });

    var mailOptions = {
      from: emailSender,
      to: emailReceiver,
      subject: subject,
      html: ` <p>Votre code est:------(<h2>${code}</h2>)</p>`
    };

    return (
      <div>
        {transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        })}
      </div>
    );
  }
}

export default Email;
