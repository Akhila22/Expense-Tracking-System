// var express=require('express');
// var mysql=require('mysql');
// var bodyParser = require('body-parser');
// var url= require('url');
// var app=express();

// var connection=mysql.createConnection({

//                host:'localhost',user:'root',password:'',database:'expensetracking'
// });


// connection.connect(function(error){
//                if(!!error){
//                               console.log('Error');
//                }else{
//                               console.log('Connected');
//                }
// });


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function(req, res, next) {
//      res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// next();
// });

exports.addExp = function(req, res) {
                var category_id = req.body.category;
                var vendorname = req.body.vendor;
                var date = req.body.date;
                var description= req.body.desc;
                var amount = req.body.amount;
                //var cid;
                var vid;
                console.log(req.body);

                // connection.query(sql, function(error,rows,fields){
                //                if(!!error){
                //                               console.log('Error in the query');
                //                }
                //                else
                //                {
                //                  cid=rows[0].category_id;
                                 console.log(vendorname);    
                                 var sql2 = "select vendor_id from vendor where vendor_name = '"+vendorname+"';";
                                 console.log(sql2); 
                                 connection.query(sql2, function(error,rows,fields){
                                 if(!!error){
                                  console.log(sql2);
                                              console.log('Error in the query');
                                 }
                                 else
                                 {
                                    
                                    if(typeof rows[0] == "undefined"){

                                      var sql3="insert into vendor(vendor_name) values('"+vendorname+"');";
                                      console.log(sql3);
                                      
                                      connection.query(sql3, function(error,rows,fields){
                                      if(!!error){
                                        console.log('Error in the query');
                                      }
                                      else{
                                      var sql4 = "select vendor_id from vendor where vendor_name = '"+vendorname+"';";                                      
                                        connection.query(sql4, function(error,rows1,fields){
                                        console.log(sql4);
                                          if(!!error){
                                            console.log('Error in the query');
                                          }
                                          else{
                                            vid=rows1[0].vendor_id;
                                            var sql5 = "insert into expenses(user_id,category_id,amount,date,description,vendor_id) values(1,"+category_id+","+amount+",'"+date+"','"+description+"',"+vid+")";
                                   

                                    connection.query(sql5, function(error,rows,fields){
                                    if(!!error){
                                      console.log(sql1);
                                      console.log('Error in the query');
                                    }
                                    else
                                    {
                                      console.log('Inserted successfully!!');
                                    }
                                  });
                                          }
                                        });
                                      }

                                      });


                                    }
                                   
                                    else{
                                      vid = (rows[0].vendor_id);
                                      var sql1 = "insert into expenses(user_id,category_id,amount,date,description,vendor_id) values(1,"+category_id+","+amount+",'"+date+"','"+description+"',"+vid+")";
                                   

                                    connection.query(sql1, function(error,rows,fields){
                                    if(!!error){
                                      console.log(sql1);
                                      console.log('Error in the query');
                                    }
                                    else
                                    {
                                      console.log('Inserted successfully!!');
                                    }
                                  });
                                    }

                                }
                              });
                          //  }

                //});


            };    



