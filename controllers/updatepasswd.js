
exports.updatepassword = function(req,res) {
    // var userId = req.session.userId;

    trycatch(function() {
        var userName = req.body.mail;
        console.log(userName);

        res.setHeader("Content-Type", "text/html");
        var sql1 = mysql.format("UPDATE user SET password=newpassword WHERE username=?", [userName]);
        connection.query(sql1, function(error,rows,fields) {
            console.log(sql1);
            if (error) {
                throw new Error("Error in the query");
            }
            else {
                res.send(true);
            }
        });
    },function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
