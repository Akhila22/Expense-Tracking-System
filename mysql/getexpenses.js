exports.getExpenseTbl = function(req, res){
  trycatch(function(){
    console.log(req.session.user_id);
    if(!req.session.user_id){
      throw new Error("User not logged in");
    }
    console.log('getexpense back end file');
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

exports.delExpenseTbl = function(req, res){
  trycatch(function(){
    if(!req.session.user_id){
      throw new Error("User not logged in");
    }
    var param = JSON.parse(Object.keys(req.body));
    console.log(param);
    var expense_id = param.expenseId;
    var sql = "delete from expenses where expense_id = ?";
    console.log('Delete Expense Query: \n' + sql);
    connection.query(sql, [expense_id], function(error,result){
      if(!!error){
        throw new Error('Error in the query ' + error);
      }
      console.log("Number of records deleted: " + result.affectedRows);
      res.send(true);
    });
  },function(err){
    console.log(err.stack);
    res.send(false);
  });
};
