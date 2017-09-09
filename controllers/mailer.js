var uuid = require("uuid");

exports.sendmail = function(req,res) {
    trycatch(function() {
        var newpassword = uuid.v1();
        exports.newpassword = newpassword;
        server.start();

        // create reusable transporter object using SMTP transport

        var transporter = nodemailer.createTransport({
            host: "SMTP.office365.com",
            port: 25,
            secure: false,
            ignoreTLS: false,
            auth: {
                user: "username@ca.com",
                pass: "password"
            },
            tls: {
                ciphers: "SSLv3"
            }
        });

        var maillist = mail;

        // setup e-mail data with unicode symbols
        var mailOptions = {
            // sender address
            from: "username@ca.com",
            // list of receivers
            to: maillist,
            // Subject line
            subject: "Mail from CA Education Team",
            // plaintext body
            text: "It works ?",
            // rich text html body
            html: "<p>This is the dummy passowrd for your authentication. Please change your password when you login with dummy password</p>" +
                  "<b>Dummy passowrd:</b> " + newpassword,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Message sent: " + info.response);
            }
        });

    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
