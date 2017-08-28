
exports.addExp = function(req, res) {
	console.log("expense node js");
     trycatch(function(){
	var temp = Object.keys(req.body);
    var json = JSON.parse(temp)
    var category_id = json.category;
    var vendorname = json.vendor;
    var date = json.date;
    var dateStr = date.split(" ");
    console.log(dateStr[0]);
    var dateSplit = dateStr[0].split("-");
    console.log(dateSplit[1]);
    var month = parseInt(dateSplit[1]);
    var quarter_number;
    if(month>=4 && month<=6){
    	quarter_number = 1;
    }
    else if(month>=7 && month<=9){
    	quarter_number = 2;
    }
    else if(month>=10 && month<=12){
        quarter_number = 3;
    }
    else if(month>=1 && month<=3){
        quarter_number = 4;
    }	
    console.log(quarter_number);
    var description= json.description;
    var amount = parseInt(json.amount);
    var vid;
    var uid = req.session.user_id;
    var financial_year = json.year;
    console.log(financial_year);
    var remaining_budget;
    var quarter_budget;
    var user_email;
    var admin_email;
    var category_name;
    
    
    //values for mail
    
    var sqlUser = "Select username from user where user_id="+uid;
    connection.query(sqlUser,function(error,rows,fields){
        if(!!error){
          throw new Error('Error in the query ' + error);
        }else{
          //res.send(rows);
          user_email = rows[0].username;
          console.log(rows);
        }
      });

    var sqlAdmin = "Select username from user where user_id IN (select user_id from category where category_id="+category_id+")";
    connection.query(sqlAdmin,function(error,rows,fields){
        if(!!error){
          throw new Error('Error in the query ' + error);
        }else{
          //res.send(rows);
          admin_email = rows[0].username;
        }
      });

    var sqlCat = "Select category_name from category where category_id="+category_id;
    connection.query(sqlCat,function(error,rows,fields){
        if(!!error){
          throw new Error('Error in the query ' + error);
        }else{
          //res.send(rows);
          cat_name = rows[0].category_name;
        }
      });
    
    
                
    var sqlBudget = "select remaining_budget from category_financial_year where category_id="+category_id +" AND financial_year ='"+financial_year+"'"; 
    connection.query(sqlBudget,function(error,rows,fields){
    	if(!!error){
    		console.log("error in query 1");
             throw new Error("Error in the query 1");
        }
        else{
            remaining_budget = parseInt(rows[0].remaining_budget) - amount;
            console.log(remaining_budget);
        }
     });
                
     var sqlQuarterBudget = "select quarter_budget from quarterwise_budget where category_id="+category_id +" AND financial_year ='"+financial_year+"' AND quarter_number="+quarter_number; 
     connection.query(sqlQuarterBudget,function(error,rows,fields){
    	 if(!!error){
    		 console.log(sqlQuarterBudget);
    		 console.log("error in query 2");
              throw new Error("Error in the query 2");
       	 }
       	 else{
             quarter_budget = parseInt(rows[0].quarter_budget) - amount;
              console.log(quarter_budget);
         }
     });

     var sql2 = "select vendor_id from vendor where vendor_name = '"+vendorname+"';";
     connection.query(sql2, function(error,rows,fields){
    	 if(!!error){
    		 console.log('Error in the query 3');
              throw new Error("Error in the query 3");
         }
         else{
        	 if(typeof rows[0] == "undefined"){
        		 var sql3="insert into vendor(vendor_name) values('"+vendorname+"');";
                 connection.query(sql3, function(error,rows,fields){
                	 if(!!error){
                		 console.log('Error in the query 4');
                          throw new Error("Error in the query 4");
                     }
                     else{
                    	 var sql4 = "select vendor_id from vendor where vendor_name = '"+vendorname+"';";
                         connection.query(sql4, function(error,rows1,fields){
                        	 if(!!error){
                        		 console.log('Error in the query 5');
                                  throw new Error("Error in the query 5");
                             }
                             else{
                            	 vid=rows1[0].vendor_id;
                                 var sql5 = "insert into expenses(user_id,category_id,amount,date,description,vendor_id,financial_year) values("+uid+","+category_id+","+amount+",'"+date+"','"+description+"',"+vid+",'"+financial_year+"')";
                                 connection.query(sql5, function(error,rows,fields){
                                	 if(!!error){
                                		 console.log('Error in the query 6');
                                          throw new Error("Error in the query 6");
                                     }
                                     else
                                     {
                                    	 console.log('Inserted successfully!!');
                                    	
                                         var sqlUpdate = "UPDATE category_financial_year SET remaining_budget ="+ remaining_budget +" WHERE category_id = "+category_id+" AND financial_year = '"+financial_year+"'";
                                         connection.query(sqlUpdate,function(error,rows,fields){
                                        	 console.log(sqlUpdate);
                                        	 if(!!error){
                                        		 console.log("error in query 7");
                                                  throw new Error("Error in the query 7");
                                        	 }
                                        	 else{
                                        		 console.log('Updated');
                                        		 if(quarter_budget < 0){
                                        	    	 //mail logic
                                               mailernotify.sendmailnotify(req,res,quarter_number,quarter_budget,user_email,admin_email,category_name,financial_year);
                                                      

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
        	 	else{
        	 		vid = (rows[0].vendor_id);
                    var sql1 = "insert into expenses(user_id,category_id,amount,date,description,vendor_id,financial_year) values("+uid+","+category_id+","+amount+",'"+date+"','"+description+"',"+vid+",'"+financial_year+"')";
                    connection.query(sql1, function(error,rows,fields){
                    	if(!!error){
                    		console.log('Error in the query');
                             throw new Error("Error in the query");
                        }
                        else{
                        	console.log('Inserted successfully!!');
                             var sqlUpdate1 = "UPDATE category_financial_year SET remaining_budget ="+ remaining_budget +" WHERE category_id = "+category_id+" AND financial_year = '"+financial_year+"'";
                             connection.query(sqlUpdate1,function(error,rows,fields){
                            	 console.log(sqlUpdate1);
                                 if(!!error){
                                	 console.log("error in query");
                                      throw new Error("Error in the query");
                                 }
                                 else{
                                      console.log('Updated');
                                      if(quarter_budget < 0){
                             	    	 //mail logic
                                      mailernotify.sendmailnotify(req,res,quarter_number,quarter_budget,user_email,admin_email,category_name,financial_year);

                             	     }
                                       res.send(true);
                                 }
                              });
                          }
                      });
                   }
         	}
     });
     
},function(err){
    console.log(err.stack);
    res.send(false);
  });
};
