
exports.addnewuser = function(req, res) {
    trycatch(function() {
        var email = req.body.email;
        var password = req.body.user;
        var userrole = req.body.userrole;

        var sql = mysql.format('insert into user(username,password,role_id) values(?,?,?)', [email, password, userrole]);
        // console.log(sql);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                throw new Error('Error in the query\n' + error);
            }
            else {
                console.log('User Added Successfully');
                res.send(true);
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
