var uuid = require("uuid");

exports.sendmailnotify = function(req,res,quarterNumber,quarterBudget,userEmail,adminEmail,categoryName,financialYear) {
    trycatch(function() {
        server.start();

        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "boddupalliaditya@gmail.com",
                pass: "maheshbabu1"
            }
        });

        var emailIdPat = userEmail + "," + adminEmail;
        console.log(userEmail);
        console.log(emailIdPat);

        var maillist = emailIdPat;

        // setup e-mail data with unicode symbols
        var mailOptions = {
            // sender address
            from: "boddupalliaditya@gmail.com",
            // list of receivers
            to: maillist,
            // Subject line
            subject: "Mail from CA Education Team",
            // plaintext body
            text: "It works ?",
            // rich text html body
            html: "<p>Budget for quarter Q" + quarterNumber + " has exceeded for category " +
                  categoryName + ". Remaining quarter budget = " + quarterBudget +
                  " for financial year " + financialYear + "</p>",
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
