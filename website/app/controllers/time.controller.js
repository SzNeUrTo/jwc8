exports.render = function(req, res){
  res.render('time.html');
}
exports.sendMail = function(req, res){
  var nodemailer = require("nodemailer");
  var sendEmail = '';
  var password = '';
  var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
          auth: {
              user: sendEmail,
              pass: password
        }
  });
  var mailOptions = {
      from: "", // sender address
      to: req.body.email, // list of receivers
      subject: "", // Subject line
      html: "" // html body
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }
      smtpTransport.close();
    });
}
