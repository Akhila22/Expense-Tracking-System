exports.addbudget=function(req, res) {
   var financial_year = req.body.year;
   var date = req.body.date;
   var budget = req.body.budget;
   console.log(req.body);
   var sql1 = "insert into budget(financial_year,budget,date) values('"+ financial_year +"',"+ budget +",'"+ date +"')";
   connection.query(sql1, function(error,rows,fields){
      console.log('in the query');
       if(!!error){
        console.log('Error in the query');
       }
       else
       {
        console.log("inserted successfully");
        //res.redirect('/adminLogin');
       }
    });
};
