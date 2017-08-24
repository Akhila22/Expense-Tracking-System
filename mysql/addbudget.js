


exports.addbudget=function(req, res) {

    var temp = Object.keys(req.body);
    var json = JSON.parse(temp);
    //console.log(json);
    var financial_year = json.year;
    var date = json.date;
    var budget = json.budget;
   
    var sql1 = "insert into budget(financial_year,budget,date) values('"+ financial_year +"',"+ budget +",'"+ date +"')";
    connection.query(sql1, function(error,rows,fields){
    //console.log('in the query');
      if(!!error){
        console.log('Error in the query');
      }
      else
      {
        console.log("inserted successfully");
        
      }
    });
};
