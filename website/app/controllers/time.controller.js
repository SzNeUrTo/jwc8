exports.render = function(req, res) {
  res.render('time.html');
}

exports.sendMail = function(req, res) {
  var nodemailer = require("nodemailer");
  var xoauth2 = require("xoauth2");
  var config = require('../../config/password.config.js').getEmailConfig();
  console.log(config);
  var sendEmail = config.email;
  var password = config.password;
  var xoauth={
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: sendEmail,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: config.accessToken
        })
    }
  }

  var transporter = nodemailer.createTransport(xoauth);
  var mailOptions = {
      from: sendEmail,
      to: req.body.email,
      subject: config.subject,
      html: config.html
  }

  transporter.sendMail(mailOptions, function(err){
      if(err){
        console.log(err);
        res.render(err);
      }
      else{
        console.log("SUCCESS");
        res.render('success');
      }
  });
}
