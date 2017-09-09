
exports.loginFun = function(req, res) {
    trycatch(function() {
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.user;
        var sql = mysql.format("select role_id,user_id,username from user where username=? and password=?", [email, password]);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                console.log("Error in the query");
            }
            else {
                req.session.userId = rows[0]["user_id"];
                req.session.roleId = rows[0]["role_id"];
                req.session.userName = rows[0].username;
                var temp = String(req.session.roleId);
                res.send(temp);
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
