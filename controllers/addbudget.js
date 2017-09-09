
exports.addbudget = function(req, res) {
    trycatch(function() {
        var financialYear = req.body.year;
        var date = req.body.date;
        var budget = req.body.budget;
        var sql1 = mysql.format("insert into budget(financial_year,budget,date) values(?,?,?)", [financialYear, budget, date]);

        connection.query(sql1, function(error,rows,fields) {
            if (error) {
                console.log("Error in the query");
                throw new Error("Error in the query");
            }
            else {
                console.log("Inserted Successfully");
                res.send(true);
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
