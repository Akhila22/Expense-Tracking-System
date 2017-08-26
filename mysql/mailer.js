//var nodemailer = require('nodemailer');
//var server = require('./start');
exports.sendmail = function(req,res){

    trycatch(function(){

server.start();
// create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'boddupalliaditya@gmail.com',
            pass: ''
        }
    });
var maillist=mail;
// setup e-mail data with unicode symbols
    var mailOptions = {
// sender address
        from: 'boddupalliaditya@gmail.com', 
// list of receivers
        to: maillist, 
// Subject line
        subject: 'Mail from CA Education Team', 
// plaintext body
        text: 'It works ?',
// rich text html body
        html: "<p>Hello from CA education Team. </p>",
    };
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
},function(err){
        console.log(err.stack);
        res.send(false);
    });



};


