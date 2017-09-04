app.route('/report').
post(function(req, res){
  trycatch(function() {
    if(!req.session.user_id){
      throw new Error("User not logged in");
    }
    var param = JSON.parse(Object.keys(req.body));
    console.log(param);
    var year = param.fy;
    var sql = "SELECT category_name,"+
     "MAX(IF(a.quarter_number=1,quarter_budget,0)) q1_ini_bud,"+
     "MAX(IF(a.quarter_number=1,actual_budget,0)) q1_act_bud,"+
     "MAX(IF(a.quarter_number=2,quarter_budget,0)) q2_ini_bud,"+
     "MAX(IF(a.quarter_number=2,actual_budget,0)) q2_act_bud,"+
     "MAX(IF(a.quarter_number=3,quarter_budget,0)) q3_ini_bud,"+
     "MAX(IF(a.quarter_number=3,actual_budget,0)) q3_act_bud,"+
     "MAX(IF(a.quarter_number=4,quarter_budget,0)) q4_ini_bud,"+
     "MAX(IF(a.quarter_number=4,actual_budget,0)) q4_act_bud,"+
     "initial_budget FROM"+
      "("+
        "SELECT DISTINCT c.category_id,quarter_number,initial_budget,"+
        "category_name,quarter_budget "+
        "from quarterwise_budget qb,category c,category_financial_year cfy "+
        "WHERE qb.category_id = c.category_id "+
        "and cfy.category_id = c.category_id and qb.financial_year = '"+year+"' "+
        "group by c.category_id,quarter_number"+
      ") as a left join"+
      "("+
        "select DISTINCT category_id,sum(amount) as actual_budget,"+
        "CASE "+
        "WHEN Month(date)>=4 && Month(date)<=6 THEN 1 "+
        "WHEN Month(date)>=7 && Month(date)<=9 THEN 2 "+
        "WHEN Month(date)>=10 && Month(date)<=12 THEN 3 "+
        "ELSE 4 END as quarter_number "+
        "from expenses "+
        "where financial_year='"+year+"' "+
        "group by category_id,quarter_number"+
      ") as b on a.category_id=b.category_id and a.quarter_number = b.quarter_number "+
      "group by a.category_id";
      connection.query(sql, function(error,rows,fields){
        if(!!error){
          throw new Error('Error in the query ' + error);
        }else {
          res.send(rows);
        }
      });
  },function(err) {
    console.log(err.stack);
    res.send(false);
  });
});

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
