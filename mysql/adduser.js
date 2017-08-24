
exports.addnewuser=function(req, res){

  var temp = Object.keys(req.body);
  //  console.log("temp " + temp);
  var json = JSON.parse(temp);
	console.log(json);
	var email = json.email;
	var password = json.user;
	var userrole = json.userrole;

    var sql = "insert into user(username,password,role_id) values('"+ email +"','"+ password +"',"+ userrole +")";
   // console.log(sql);
    connection.query(sql, function(error,rows,fields){
      if(!!error){
        console.log('Error in the query');
      }else{
        console.log('Inserted Successfully');
        //res.send("user added Successfully");
      }
    });
};