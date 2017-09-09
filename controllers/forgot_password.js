
exports.forgotpassword = function(req, res) {
    trycatch(function() {
        var email = req.body.recoveryemail;
        var sql = mysql.format("select user_id from user where username=?", [email]);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                if (rows.length < 1) {
                    console.log(rows.length);
                    console.log("user_not_there");
                    res.send("user_not_there");
                }
                else {
                    console.log("enteredelse");
                    res.send(true);
                }
            }
        });
    }, function (err) {
        console.log(err.stack);
        res.send(false);
    });
};
