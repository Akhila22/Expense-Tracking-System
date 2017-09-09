
exports.addExp = function(req, res) {
    console.log("expense node js");
    trycatch(function() {
        var categoryId = req.body.category;
        var vendorname = req.body.vendor;
        var date = req.body.date;
        var dateStr = date.split(" ");
        console.log(dateStr[0]);
        var dateSplit = dateStr[0].split("-");
        console.log(dateSplit[1]);
        var month = parseInt(dateSplit[1]);
        var quarterNumber;
        if (month >= 4 && month <= 6) {
            quarterNumber = 1;
        }
        else if (month >= 7 && month <= 9) {
            quarterNumber = 2;
        }
        else if (month >= 10 && month <= 12) {
            quarterNumber = 3;
        }
        else if (month >= 1 && month <= 3) {
            quarterNumber = 4;
        }
        console.log(quarterNumber);
        var description = req.body.description;
        var amount = parseInt(req.body.amount);
        var vid;
        var uid = req.session.userId;
        var financialYear = req.body.year;
        console.log(financialYear);
        var remainingBudget;
        var quarterBudget = 0;
        var userEmail;
        var adminEmail;
        var categoryName;
        var quarterExp = 0;

        var sqlUser = mysql.format("Select username from user where user_id=?", [uid]);
        connection.query(sqlUser, function(error, rows, fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                userEmail = rows[0]["username"];
                console.log(rows);
            }
        });

        var sqlAdmin = mysql.format("Select username from user " +
                      "where user_id IN (select user_id from category " +
                      "where category_id=?)", [categoryId]);
        connection.query(sqlAdmin, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                adminEmail = rows[0]["username"];
            }
        });

        var sqlCat = mysql.format("Select category_name from category " +
                      "where category_id=?", [categoryId]);
        connection.query(sqlCat, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                var catName = rows[0]["category_name"];
            }
        });

        var sqlBudget = mysql.format("select remaining_budget from " +
                        "category_financial_year where " +
                        "category_id=? AND financial_year=?",
                        [categoryId, financialYear]);
        connection.query(sqlBudget, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                remainingBudget = parseInt(rows[0]["remaining_budget"]);
                console.log(remainingBudget);
            }
        });

        var sqlQuarterBudget = mysql.format("select quarter_budget from " +
                                "quarterwise_budget where " +
                                "category_id=? AND financial_year =? " +
                                "AND quarter_number=?",
                                [categoryId, financialYear, quarterNumber]);
        connection.query(sqlQuarterBudget, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                quarterBudget = parseInt(rows[0]["quarter_budget"]);
                console.log(quarterBudget);
            }
        });

        var sqlExpBudget = mysql.format("select amount,date from expenses " +
                            "where category_id=? and financial_year=?",
                            [categoryId, financialYear]);
        connection.query(sqlExpBudget, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                for (var i = 0;i < rows.length;i++) {
                    var dateValue = "" + rows[i].date;
                    // console.log(dateValue);
                    var dateString = dateValue.split(" ");
                    // console.log(dateString[0]);
                    // var dateSplitNew = dateString[0].split("-");
                    console.log(dateString[1]);
                    var monthVal = dateString[1];
                    var quarterNum;
                    if (monthVal === "Apr" || monthVal === "May" || monthVal === "Jun") {
                        quarterNum = 1;
                    }
                    else if (monthVal === "Jul" || monthVal === "Aug" || monthVal === "Sep") {
                        quarterNum = 2;
                    }
                    else if (monthVal === "Oct" || monthVal === "Nov" || monthVal === "Dec") {
                        quarterNum = 3;
                    }
                    else if (monthVal === "jan" || monthVal === "Feb" || monthVal === "Mar") {
                        quarterNum = 4;
                    }
                    console.log(quarterNum);
                    if (quarterNum === quarterNumber) {
                        quarterExp = parseInt(quarterExp) + parseInt(rows[i]["amount"]);
                        console.log(quarterBudget);
                    }
                }
            }
        });

        quarterExp = quarterExp + amount;
        console.log(quarterBudget);

        var sql2 = mysql.format("select vendor_id from vendor " +
                    "where vendor_name = ?", [vendorname]);
        connection.query(sql2, function(error,rows,fields) {
            if (error) {
                throw new Error("Error in the query\n" + error);
            }
            else {
                if (typeof rows[0] === "undefined") {
                    var sql3 = mysql.format("insert into vendor(vendor_name) " +
                                "values(?);", [vendorname]);
                    connection.query(sql3, function(error,rows,fields) {
                        if (error) {
                            throw new Error("Error in the query\n" + error);
                        }
                        else {
                            var sql4 = mysql.format("select vendor_id from vendor " +
                                        "where vendor_name=?", [vendorname]);
                            connection.query(sql4, function(error,rows,fields) {
                                if (error) {
                                    throw new Error("Error in the query\n" + error);
                                }
                                else {
                                    vid = rows[0]["vendor_id"];
                                    var sql5 = mysql.format("insert into expenses(user_id," +
                                                "category_id,amount,date,description," +
                                                "vendor_id,financial_year) values(?,?,?,?,?,?,?)",
                                                [uid, categoryId, amount, date, description, vid, financialYear]);
                                    connection.query(sql5, function(error,rows,fields) {
                                        if (error) {
                                            throw new Error("Error in the query\n" + error);
                                        }
                                        else {
                                            console.log("Inserted Successfully");

                                            var sqlUpdate = mysql.format("UPDATE category_financial_year " +
                                                            "SET remaining_budget=? WHERE category_id=? " +
                                                            "AND financial_year=?",
                                                            [remainingBudget, categoryId, financialYear]);
                                            connection.query(sqlUpdate, function(error,rows,fields) {
                                                console.log(sqlUpdate);
                                                if (error) {
                                                    throw new Error("Error in the query\n" + error);
                                                }
                                                else {
                                                    console.log("Updated");
                                                    if (quarterBudget < quarterExp) {
                                                        //mail logic
                                                        mailernotify.sendmailnotify(req,res,quarterNumber,quarterBudget,userEmail,adminEmail,categoryName,financialYear);
                                                    }
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
                    vid = rows[0]["vendor_id"];
                    var sql1 = mysql.format("insert into expenses(user_id,category_id," +
                                "amount,date,description,vendor_id,financial_year) " +
                                "values(?,?,?,?,?,?,?)",
                                [uid, categoryId, amount, date, description, vid, financialYear]);
                    connection.query(sql1, function(error,rows,fields) {
                        if (error) {
                            throw new Error("Error in the query\n" + error);
                        }
                        else {
                            console.log("Inserted Successfully!!");
                            var sqlUpdate1 = mysql.format("UPDATE category_financial_year " +
                                              "SET remaining_budget=? WHERE category_id=? " +
                                              "AND financial_year=?",
                                              [remainingBudget, categoryId, financialYear]);
                            connection.query(sqlUpdate1, function(error,rows,fields) {
                                if (error) {
                                    throw new Error("Error in the query\n" + error);
                                }
                                else {
                                    console.log("Updated");
                                    if (quarterBudget < quarterExp) {
                                        // mail logic
                                        mailernotify.sendmailnotify(req,res,quarterNumber,quarterBudget,userEmail,adminEmail,categoryName,financialYear);
                                    }
                                    res.send(true);
                                }
                            });
                        }
                    });
                }
            }
        });
    }, function(err) {
        console.log(err.stack);
        res.send(false);
    });
};
