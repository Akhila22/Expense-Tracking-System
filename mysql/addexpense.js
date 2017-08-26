
exports.addExp = function(req, res) {
	var temp = Object.keys(req.body);
    var json = JSON.parse(temp)
    var category_id = json.category;
    var vendorname = json.vendor;
    var date = json.date;
//    var dateStr = date.split(" ");
//    var dateSplit = dateStr.split("-");
    var quarter_number = 1;
    /*if(dateSplit[1]>=4 || dateSplit[1]<=6){
    	quarter_number = 1;
    }
    else if(dateSplit[1]>=7 || dateSplit[1]<=9){
    	quarter_number = 2;
    }
    else if(dateSplit[1]>=10 || dateSplit[1]<=12){
        quarter_number = 3;
    }
    else if(dateSplit[1]>=1 || dateSplit[1]<=3){
        quarter_number = 4;
    }*/	
    var description= json.description;
    var amount = parseInt(json.amount);
    var vid;
    var uid = req.session.user_id;
    var financial_year = json.year;
    var remaining_budget;
    var quarter_budget;
                
    var sqlBudget = "select remaining_budget from category_financial_year where category_id="+category_id +" AND financial_year ='"+financial_year+"'"; 
    connection.query(sqlBudget,function(error,rows,fields){
    	if(!!error){
    		console.log("error in query");
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
    		 console.log("error in query");
       	 }
       	 else{
             quarter_budget = parseInt(rows[0].quarter_budget) - amount;
              console.log(quarter_budget);
         }
     });

     var sql2 = "select vendor_id from vendor where vendor_name = '"+vendorname+"';";
     connection.query(sql2, function(error,rows,fields){
    	 if(!!error){
    		 console.log('Error in the query');
         }
         else{
        	 if(typeof rows[0] == "undefined"){
        		 var sql3="insert into vendor(vendor_name) values('"+vendorname+"');";
                 connection.query(sql3, function(error,rows,fields){
                	 if(!!error){
                		 console.log('Error in the query');
                     }
                     else{
                    	 var sql4 = "select vendor_id from vendor where vendor_name = '"+vendorname+"';";
                         connection.query(sql4, function(error,rows1,fields){
                        	 if(!!error){
                        		 console.log('Error in the query');
                             }
                             else{
                            	 vid=rows1[0].vendor_id;
                                 var sql5 = "insert into expenses(user_id,category_id,amount,date,description,vendor_id,financial_year) values("+uid+","+category_id+","+amount+",'"+date+"','"+description+"',"+vid+",'"+financial_year+"')";
                                 connection.query(sql5, function(error,rows,fields){
                                	 if(!!error){
                                		 console.log('Error in the query');
                                     }
                                     else
                                     {
                                    	 console.log('Inserted successfully!!');
                                    	 var quarter_wise = "UPDATE quarterwise_budget SET quarter_budget ="+ quarter_budget +" WHERE category_id = "+category_id+" AND financial_year = '"+financial_year+"' AND quarter_number="+quarter_number;
                                    	 connection.query(quarter_wise,function(error,rows,fields){
                                    		 console.log(sqlUpdate1);
                                    		 if(!!error){
                                    			 console.log("error in query");
                                    		 }
                                    		 else{
                                    			 console.log('Updated');
                                    		 }
                                      	 });
                                         var sqlUpdate = "UPDATE category_financial_year SET remaining_budget ="+ remaining_budget +" WHERE category_id = "+category_id+" AND financial_year = '"+financial_year+"'";
                                         connection.query(sqlUpdate,function(error,rows,fields){
                                        	 console.log(sqlUpdate);
                                        	 if(!!error){
                                        		 console.log("error in query");
                                        	 }
                                        	 else{
                                        		 console.log('Updated');
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
                        }
                        else{
                        	console.log('Inserted successfully!!');
                            var quarter_wise1 = "UPDATE quarterwise_budget SET quarter_budget ="+ quarter_budget +" WHERE category_id = "+category_id+" AND financial_year = '"+financial_year+"' AND quarter_number="+quarter_number;
                            connection.query(quarter_wise1,function(error,rows,fields){
                            	console.log(sqlUpdate1);
                                if(!!error){
                                	console.log("error in query");
                               	}
                                else{
                                	console.log('Updated');
                               	}
                             });
                             var sqlUpdate1 = "UPDATE category_financial_year SET remaining_budget ="+ remaining_budget +" WHERE category_id = "+category_id+" AND financial_year = '"+financial_year+"'";
                             connection.query(sqlUpdate1,function(error,rows,fields){
                            	 console.log(sqlUpdate1);
                                 if(!!error){
                                	 console.log("error in query");
                                 }
                                 else{
                                      console.log('Updated');
                                 }
                              });
                          }
                      });
                   }
         	}
     });
};
