//app.post('/report', 

exports.addrep=function(req, res) {

  var temp = Object.keys(req.body);
  var json = JSON.parse(temp);
    //console.log(json);

  var date1 = json.date1;
  var date2 = json.date2;
  //console.log(req.body);
  var cid =[];
  var fy = [];
  var ib = [];
  var rb = [];
  var cname =[];
  var q1 = [];
  var q2=[];
  var q3 =[];
  var q4 = [];
               var sql1 = "select category_id,financial_year,initial_budget,remaining_budget from category_financial_year where date between '" +date1 +"' and '"+date2+"'";
  //var sql1 = "select date,category_id from category_financial_year where date between '" +date1 +"' and '"+date2+"'";
                              connection.query(sql1, function(error,rows,fields){
                                             if(!!error){
                                          console.log('Error in the query1');
                                             }
                                             else
                                             {
                                              console.log('------------');
                                              rows.map(function(a){
                                                cid.push(a.category_id);   
                                               fy.push(a.financial_year);
                                             ib.push(a.initial_budget);
                                             rb.push(a.remaining_budget);                                               
                                                });
                                              console.log('------------');
                                              console.log('cid values:'+cid);
                                              console.log('------------');
                                            
                                             console.log(cid);
                                                          console.log("inserted successfully 1");
                                             }
                                                                                                         });
var sql2 = "select category_name from category where category_id IN (select category_id from category_financial_year where date between '"+date1+"' and '"+date2+"')";
//var c = cid.slice(0);
                              connection.query(sql2,function(error,rows,fields){
                                             if(!!error){
                                                console.log(cid);
                                          console.log('Error in the query2');
                                             }
                                             else
                                             {   
                                                rows.map(function(a){
                                                cname.push(a.category_name);                                               
                                                });

                                              console.log("inserted successfully 2");
                                             }
                  });
var sql3 = "select quarter_budget from quarterwise_budget where category_id IN (select category_id from category_financial_year where date between '"+date1+"' and '"+date2+"' && quarter_number=1)";
                              connection.query(sql3, function(error,rows,fields){
                                             if(!!error){
                                          console.log('Error in the query3');
                                             }
                                             else
                                             {
                                               rows.map(function(a){
                                                q1.push(a.quarter_budget);                                                  
                                                });
                                              console.log("inserted successfull 3");
                                            
                                             }
                  
                  });
var sql4 = "select quarter_budget from quarterwise_budget where category_id IN (select category_id from category_financial_year where date between '"+date1+"' and '"+date2+"' && quarter_number=2)";
                              connection.query(sql4, function(error,rows,fields){
                                             if(!!error){
                                          console.log('Error in the query3');
                                             }
                                             else
                                             {
                                               rows.map(function(a){
                                                q2.push(a.quarter_budget);                                                  
                                                });
                                              console.log("inserted successfull 3");
                                            
                                             }
                  
                  });
var sql5 = "select quarter_budget from quarterwise_budget where category_id IN (select category_id from category_financial_year where date between '"+date1+"' and '"+date2+"' && quarter_number=3)";
                              connection.query(sql5, function(error,rows,fields){
                                             if(!!error){
                                          console.log('Error in the query3');
                                             }
                                             else
                                             {
                                               rows.map(function(a){
                                                q3.push(a.quarter_budget);                                                  
                                                });
                                              console.log("inserted successfull 3");
                                            
                                             }
                  
                  });
var sql6 = "select quarter_budget from quarterwise_budget where category_id IN (select category_id from category_financial_year where date between '"+date1+"' and '"+date2+"' && quarter_number=4)";
                              connection.query(sql6, function(error,rows,fields){
                                             if(!!error){
                                          console.log('Error in the query3');
                                             }
                                             else
                                             {
                                               rows.map(function(a){
                                                q4.push(a.quarter_budget);                                                  
                                                });
                                              console.log("inserted successfull 3");
                                             console.log("sending "+cid);
                                             console.log(fy);
                      res.send({cid : cid, cname : cname, fy : fy, ib : ib, rb : rb, q1:q1, q2 : q2, q3 : q3, q4 : q4});

                                             }
                  
                  });

                              
};

