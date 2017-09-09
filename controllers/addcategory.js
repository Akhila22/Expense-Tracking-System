
exports.addcategory = function(req, res) {
    trycatch(function() {
        var categoryName = req.body.category;
        var initialBudget = req.body.budget;
        var financialYear = req.body.year;
        var Q1 = req.body.q1;
        var Q2 = req.body.q2;
        var Q3 = req.body.q3;
        var id;
        var Q4 = req.body.q4;
        var userId = req.session.userId;
        var date = req.body.date;
        var catId;
        // console.log(req.body);

        var sql0 = mysql.format("select budget from budget where financial_year=?", [financialYear]);
        connection.query(sql0, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                console.log(rows);
                var sql0result = rows[0]["budget"];
                console.log(sql0result);
                var sql = mysql.format("select sum(initial_budget) as sum from " +
                          "category_financial_year where financial_year=?",
                          [financialYear]);
                connection.query(sql, function(error,rows,fields) {
                    if (error) {
                        throw new Error("Error in the query\n" + error);
                    }
                    else {
                        console.log(rows);
                        var sqlresult = rows[0].sum;
                        console.log(sqlresult);
                        var remBudget = sql0result - sqlresult;
                        console.log(remBudget);
                        console.log(initialBudget);
                        if (initialBudget > remBudget) {
                            console.log("budget_overflow");
                            var send = {};
                            send.rem = remBudget;
                            res.send("budget_overflow");
                        }
                        else {
                            console.log("enteredelse");
                            var str = mysql.format("select category_id from category " +
                                      "where category_name=?", [categoryName]);
                            connection.query(str,function(error,rows,fields) {
                                if (error) {
                                    throw new Error("Error in the query");
                                }
                                else {
                                    // catId=rows[0].category_id;
                                    // console.log(catId);
                                    // console.log("hello9");
                                    console.log(rows.length);
                                    if (rows.length < 1) {
                                        console.log("hello");
                                        // console.log(catId);
                                        var sql1 = mysql.format("insert into category(category_name,user_id,date) " +
                                                  "values(?,?,?)", [categoryName, userId, date]);
                                        console.log(sql1);
                                        connection.query(sql1, function(error,rows,fields) {
                                            if (error) {
                                                throw new Error("Error in the query\n" + error);
                                            }
                                            else {
                                                var sql = mysql.format("select category_id from category " +
                                                          "where category_name=?", [categoryName]);
                                                connection.query(sql,function(err,result,fields) {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    else {
                                                        catId =  result[0]["category_id"];
                                                        // console.log(id);
                                                        console.log("Category Inserted Successfully");
                                                        var sql2 = mysql.format("insert into category_financial_year(category_id,financial_year,initial_budget,remaining_budget) " +
                                                                    "values(?,?,?,?)", [catId, financialYear, initialBudget, initialBudget]);
                                                        console.log(sql2);
                                                        connection.query(sql2, function(error,rows,fields) {
                                                            if (error) {
                                                                throw new Error("Error in the query\n" + error);
                                                            }
                                                            else {
                                                                console.log("Category Fin year Inserted Successfully");
                                                                var values = [
                                                                               [financialYear,catId,1,Q1],
                                                                               [financialYear,catId,2,Q2],
                                                                               [financialYear,catId,3,Q3],
                                                                               [financialYear,catId,4,Q4]
                                                                             ];
                                                                var sql3 = mysql.format("insert into quarterwise_budget(financial_year,category_id,quarter_number,quarter_budget) VALUES ?", [values]);
                                                                console.log(sql3);
                                                                connection.query(sql3, function(error,result) {
                                                                    if (error) {
                                                                        throw new Error("Error in the query\n" + error);
                                                                    }
                                                                    else {
                                                                        console.log("Inserted Successfully");
                                                                        res.send(true);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        console.log("temp " + rows);
                                        catId = rows[0]["category_id"];

                                        var sql2 = mysql.format("insert into category_financial_year(category_id,financial_year,initial_budget,remaining_budget) " +
                                                    "values(?,?,?,?)", [catId, financialYear, initialBudget, initialBudget]);

                                        console.log(sql2);
                                        connection.query(sql2, function(error,rows,fields) {
                                            if (error) {
                                                throw new Error("Error in the query\n" + error);
                                            }
                                            else {
                                                console.log("Category Fin year Inserted Successfully");
                                                var values = [
                                                               [financialYear,id,1,Q1],
                                                               [financialYear,id,2,Q2],
                                                               [financialYear,id,3,Q3],
                                                               [financialYear,id,4,Q4]
                                                             ];
                                                var sql3 = mysql.format("insert into quarterwise_budget(financial_year,category_id,quarter_number,quarter_budget) VALUES ?", [values]);
                                                connection.query(sql3, function(error,result) {
                                                    if (error) {
                                                        throw new Error("Error in the query\n" + error);
                                                    }
                                                    else {
                                                        console.log("Inserted Successfully");
                                                        res.send(true);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });

        // console.log(userId);
        // res.send(userId);
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};

exports.getCatNames = function(req,res) {
    var year = req.query.year;
    // console.log(year);
    var sql = mysql.format("SELECT category_id,category_name FROM category " +
              "where category_id IN (SELECT category_id from category_financial_year " +
              "where financial_year=?)", [year]);
    connection.query(sql,function(error,rows,fields) {
        if (error) {
            throw new Error("Error in the query\n" + error);
        }
        else {
            res.send(rows);
        }
    });
};
