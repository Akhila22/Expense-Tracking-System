
exports.getExpenseTbl = function(req, res) {
    trycatch(function() {
        if (!req.session.userId) {
            throw new Error("User not logged in");
        }
        var sql = mysql.format("select expense_id,amount,e.date,description,category_name," +
              "vendor_name FROM expenses as e, vendor v,category c WHERE " +
              "e.category_id = c.category_id and e.vendor_id = v.vendor_id " +
              "and e.user_id = ?", [req.session.userId]);
        console.log("Get Expense Query: \n" + sql);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query " + error);
            }
            else {
                res.send(rows);
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};

exports.getAllCategories = function(req,res) {
    trycatch(function() {
        if (!req.session.userId) {
            throw new Error("User not logged in");
        }
        var sql = "select category_name from category";
        console.log("Get category Query: \n" + sql);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query " + error);
            }
            else {
                console.log(rows);
                res.send(rows);
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};

exports.getExpenseDateTbl = function(req, res) {
    console.log(req.query);
    trycatch(function() {
        if (!req.session.userId) {
            throw new Error("User not logged in");
        }
        var toDate = req.query.toDate;
        var fromDate = req.query.fromDate;
        var categoryName = req.query.categoryName;
        var sql = mysql.format("select expense_id,amount,e.date,description,category_name," +
                  "vendor_name FROM expenses as e, vendor v,category c WHERE " +
                  "e.category_id = c.category_id and e.vendor_id = v.vendor_id " +
                  "and e.user_id = ? and e.date between ? and ? and category_name = ?",
                  [req.session.userId, fromDate, toDate, categoryName]);
        console.log("Get Expense by date Query: \n" + sql);
        connection.query(sql, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query " + error);
            }
            else {
                res.send(rows);
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};

exports.delExpenseTbl = function(req, res) {
    trycatch(function() {
        if (!req.session.userId) {
            throw new Error("User not logged in");
        }
        var expenseId = req.body.expenseId;
        var categoryName = req.body.categoryName;
        var financialYear = req.body.year;
        var amount = parseInt(req.body.amount);
        var sql = mysql.format("delete from expenses where expense_id = ?", [expenseId]);
        console.log("Delete Expense Query: \n" + sql);
        connection.query(sql, function(error,result) {
            if (error) {
                throw new Error("Error in the query \n" + error);
            }
            console.log("Number of records deleted: " + result.affectedRows);
            var remainingBudget;
            var sqlBudget = mysql.format("select remaining_budget from category_financial_year " +
                            "where financial_year = ? AND category_id IN " +
                            "(SELECT category_id from category where category_name = ?)",
                            [financialYear, categoryName]);
            console.log(sqlBudget);
            connection.query(sqlBudget,function(error,rows,fields) {
                if (error) {
                    throw new Error("Error in the query 1");
                }
                else {
                    remainingBudget = parseInt(rows[0]["remaining_budget"]) + amount;
                    console.log(remainingBudget);
                    var sqlUpdate = mysql.format("UPDATE category_financial_year SET remaining_budget = ? " +
                                    " WHERE financial_year = ? AND category_id IN " +
                                    "(SELECT category_id from category " +
                                    "where category_name = ?)", [remainingBudget, financialYear, categoryName]);
                    connection.query(sqlUpdate,function(error,rows,fields) {
                        console.log(sqlUpdate);
                        if (error) {
                            throw new Error("Error in the query 7");
                        }
                        else {
                            console.log("Updated");
                            res.send(true);
                        }
                    });
                }
            });
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
