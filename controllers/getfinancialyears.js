
exports.getFinYears = function(req,res) {
    var sql = "SELECT financial_year FROM budget";
    connection.query(sql, function(error,rows,fields) {
        if (error) {
            console.log("Error in the query");
        }
        else {
            res.send(rows);
        }
    });
};
