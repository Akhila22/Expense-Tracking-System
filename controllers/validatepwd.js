
exports.validatePassword = function(req,res) {
    trycatch(function() {
        var userId = req.session.userId;
        var password = req.body.password;
        var newpassword = req.body.newpassword;
        var sql = mysql.format("select password from user where user_id=?", [userId]);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query");
            }
            else {
                if (rows[0].password === password) {
                    //res.send("Success");
                    var sql1 = mysql.format("update user set password=? where user_id=?",[newpassword, userId]);
                    connection.query(sql1, function(error,rows,fields) {
                        console.log(sql1);
                        if (error) {
                            throw new Error("Error in the query");
                        }
                        else {
                            res.send(true);
                        }
                    });
                }
                else {
                    res.send(false);
                }
            }
        });
    }, function(err) {
        //console.log(err.stack);
        res.send(false);
    });
};
