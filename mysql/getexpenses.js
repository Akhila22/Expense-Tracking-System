app.route('/getexpenses')
.get(function(req, res){
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
    connection.query(sql,[req.session.user_id], function(error,rows,fields){
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
});
