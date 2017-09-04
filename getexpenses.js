exports.getExpenseTbl = function(req, res){
  trycatch(function(){
    if(!req.session.user_id){
      throw new Error("User not logged in");
    }
    var sql = "select expense_id,amount,e.date,description,category_name," +
              "vendor_name FROM expenses as e, vendor v,category c WHERE " +
              "e.category_id = c.category_id and e.vendor_id = v.vendor_id " +
              "and e.user_id = ?";
    console.log('Get Expense Query: \n' + sql);
    connection.query(sql, [req.session.user_id], function(error,rows,fields){
      if(!!error){
        throw new Error('Error in the query ' + error);
      }else{
        res.send(rows);
        
      }
    });
  },function(err){
    console.log(err.stack);
    res.send(false);
  });
};


exports.getAllCategories = function(req,res){
	trycatch(function(){
	    if(!req.session.user_id){
	      throw new Error("User not logged in");
	    }
	    var sql = "select category_name from category";
	    console.log('Get category Query: \n' + sql);
	    connection.query(sql, function(error,rows,fields){
	      if(!!error){
	        throw new Error('Error in the query ' + error);
	      }else{
	    	console.log(rows);
	        res.send(rows);
	      }
	    });
	  },function(err){
	    console.log(err.stack);
	    res.send(false);
	  });
};

exports.getExpenseDateTbl = function(req, res){
	  trycatch(function(){
	    if(!req.session.user_id){
	      throw new Error("User not logged in");
	    }
	    var url_parts = url.parse(req.url,true);
	    var query = url_parts.query;
	    //var year = req.qurry.year;
	    var toDate = req.query.toDate;
	    var fromDate = req.query.fromDate;
	    var category_name = req.query.categoryName;
	    var sql = "select expense_id,amount,e.date,description,category_name," +
	              "vendor_name FROM expenses as e, vendor v,category c WHERE " +
	              "e.category_id = c.category_id and e.vendor_id = v.vendor_id " +
	              "and e.user_id = "+req.session.user_id+" and e.date between '"+fromDate+"' and '"+toDate+"' and category_name='"+category_name+"'";
	    console.log('Get Expense by date Query: \n' + sql);
	    connection.query(sql, function(error,rows,fields){
	      if(!!error){
	        throw new Error('Error in the query ' + error);
	      }else{
	        res.send(rows);
	        
	      }
	    });
	  },function(err){
	    console.log(err.stack);
	    res.send(false);
	  });
	};

exports.delExpenseTbl = function(req, res){
  trycatch(function(){
    if(!req.session.user_id){
      throw new Error("User not logged in");
    }
    var param = JSON.parse(Object.keys(req.body));
    console.log(param);
    var expense_id = param.expenseId;
    var category_name = param.category_name;
    var financial_year = param.year;
    var amount = parseInt(param.amount);
    console.log(param);
    var sql = "delete from expenses where expense_id = "+expense_id;
    console.log('Delete Expense Query: \n' + sql);
    connection.query(sql, function(error,result){
      if(!!error){
        throw new Error('Error in the query ' + error);
      }
      console.log("Number of records deleted: " + result.affectedRows);
      var remaining_budget;
      var sqlBudget = "select remaining_budget from category_financial_year where financial_year ='"
    	  +financial_year+"' AND category_id IN (SELECT category_id from category where category_name='"+category_name+"')";
      console.log(sqlBudget);
      connection.query(sqlBudget,function(error,rows,fields){
      	if(!!error){
      		console.log("error in query 1");
               throw new Error("Error in the query 1");
          }
          else{
              remaining_budget = parseInt(rows[0].remaining_budget) + amount;
              console.log(remaining_budget);
              var sqlUpdate = "UPDATE category_financial_year SET remaining_budget ="+ remaining_budget 
              +" WHERE financial_year = '"+financial_year+"' AND category_id IN (SELECT category_id from category where category_name='"+category_name+"')";
              connection.query(sqlUpdate,function(error,rows,fields){
             	 console.log(sqlUpdate);
             	 if(!!error){
             		 console.log("error in query 7");
                       throw new Error("Error in the query 7");
             	 }
             	 else{
             		 console.log('Updated');
                       res.send(true);
             	 }
              });
          }
       });
      
    });
  },function(err){
    console.log(err.stack);
    res.send(false);
  });
};
