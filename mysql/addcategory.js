

exports.addcategory= function(req, res) {


  
  trycatch(function(){

                var temp = Object.keys(req.body);
              //  console.log("temp " + temp);
                var json = JSON.parse(temp);

                console.log(json);

                var category_name = json.category;
                var initial_budget = json.budget;
                var financial_year = json.year;
                var Q1 = json.q1;
                var Q2= json.q2;
                var Q3 = json.q3;
                var id;
                var Q4 = json.q4;
                var user_id = req.session.user_id;
                var date = json.date;
                var cat_id;
                            //  console.log(req.body);

                var sql0="select budget from budget where financial_year='"+financial_year+"'";
                connection.query(sql0, function(error,rows,fields){
                   if(!!error){
                        console.log('Error in the query');
                        throw new Error("Error in the query");
                   }
                   else
                    {
                    console.log(rows);
                    sql0result=rows[0].budget;
                    console.log( sql0result);
                                            
                    var sql="select sum(initial_budget) as sum from category_financial_year where financial_year='"+financial_year+"'";
                    connection.query(sql, function(error,rows,fields){
                       if(!!error){
                          console.log('Error in the query');
                           throw new Error("Error in the query");
                       }else
                       {
                        console.log(rows);
                        sqlresult=rows[0].sum;
                        console.log(sqlresult);

                       
                       rem_budget=sql0result-sqlresult;
                        console.log(rem_budget);
                        console.log(initial_budget);
                        if(initial_budget>rem_budget)
                        { 
                          console.log("budget_overflow");
                          var send = {};
                          send.rem = rem_budget;
                          res.send("budget_overflow");
                        }
                        else
                        {
                               console.log("enteredelse");
                        

                            var str="select category_id from category where category_name='"+category_name+"'";
                            connection.query(str,function(error,rows,fields){
                               if(!!error){
                                    console.log('Error in the query');
                                     throw new Error("Error in the query");
                                     
                                       }else
                                      {
                                          // cat_id=rows[0].category_id;
                                          // console.log(cat_id);
                                         //// console.log("hello9");
                                           console.log(rows.length);
                                           if(rows.length < 1){

                                              console.log("hello");
                                              // console.log(cat_id);


                                              var sql1 = "insert into category(category_name,user_id,date) values('"+ category_name +"',"+ user_id +",'"+ date +"')";
                                                                          console.log(sql1);
                                                connection.query(sql1, function(error,rows,fields){
                                                 if(!!error){
                                                    console.log('Error in the query');
                                                     throw new Error("Error in the query"+error);
                                               
                                                 }else
                                                 {
                                                        var sql ="select category_id from category where category_name='"+category_name+"'";
                                                        connection.query(sql,function(err,result,fields){
                                                        if(err) throw err;
                                                        else{
                                                            cat_id =  result[0].category_id;
                                                                    
                                                            // console.log(id);
                                                            console.log('Category Inserted Successfully');

                                                             var sql2 = "insert into category_financial_year(category_id,financial_year,initial_budget,remaining_budget) values("+ cat_id +",'"+ financial_year +"',"+initial_budget+","+initial_budget+")";
                                            
                                                             console.log(sql2);
                                                              connection.query(sql2, function(error,rows,fields){
                                                                 if(!!error){
                                                                        console.log('Error in the query2'+error);
                                                                         throw new Error("Error in the query"); 
                                                                 }else{

                                                                        console.log('Category Fin year Inserted Successfully');
                                                                         var values = [
                                                                         [financial_year,cat_id,1,Q1],
                                                                         [financial_year,cat_id,2,Q2],
                                                                         [financial_year,cat_id,3,Q3],
                                                                         [financial_year,cat_id,4,Q4]
                                                                         ];
                                                                          var sql3 = "insert into quarterwise_budget(financial_year,category_id,quarter_number,quarter_budget) VALUES ?";
                                                                         console.log(sql3);
                                                                         connection.query(sql3,[values], function(error,result){
                                                                           if(!!error){
                                                                                          console.log('Error in the query'+error);
                                                                                           throw new Error("Error in the query");
                                                                           }else{
                                                                                          console.log('Inserted Successfully');
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
                                            else{
                                              console.log("temp "+ rows);
                                              cat_id=rows[0].category_id;
                                            
                                             var sql2 = "insert into category_financial_year(category_id,financial_year,initial_budget,remaining_budget) values("+ cat_id +",'"+ financial_year +"',"+initial_budget+","+initial_budget+")";
                                            
                                           console.log(sql2);
                                            connection.query(sql2, function(error,rows,fields){
                                               if(!!error){
                                                      console.log('Error in the query2'+error);
                                                       throw new Error("Error in the query"); 
                                               }else{

                                                      console.log('Category Fin year Inserted Successfully');
                                                       var values = [
                                                       [financial_year,id,1,Q1],
                                                       [financial_year,id,2,Q2],
                                                       [financial_year,id,3,Q3],
                                                       [financial_year,id,4,Q4]
                                                       ];
                                                        var sql3 = "insert into quarterwise_budget(financial_year,category_id,quarter_number,quarter_budget) VALUES ?";
                                                       connection.query(sql3,[values], function(error,result){
                                                         if(!!error){
                                                                        console.log('Error in the query');
                                                                         throw new Error("Error in the query");
                                                         }else{
                                                                        console.log('Inserted Successfully');
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
                                                           
                                            
                  
                                                                                                        
                                                                          
   // console.log(user_id);
   // res.send(user_id);
    },function(err){
      console.log(err.stack);
      res.send(false);
    });
};

exports.getCatNames = function(req,res){
  var url_parts = url.parse(req.url,true);
 // console.log('url ' + url_parts);
  var query = url_parts.query;
   var year = req.query.year;
  // console.log(year);
   var sql = "SELECT category_id,category_name FROM category where category_id IN (SELECT category_id from category_financial_year where financial_year='"+year+"')";
   connection.query(sql,function(error,rows,fields){
         if(!!error){
                console.log('Error in the query');
               //  throw new Error("Error in the query");
         }
         else{
              //  console.log(rows);
                res.send(rows);
         }
   })
};