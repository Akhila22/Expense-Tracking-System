exports.validatePassword = function(req,res){

    trycatch(function(){
	var user_id = req.session.user_id;
	var temp = Object.keys(req.body);
    var json = JSON.parse(temp);
    var password = json.password;
    var newpassword = json.newpassword;
	var sql = "select password from user where user_id = "+user_id;
    connection.query(sql, function(error,rows,fields){
    	console.log(sql);
    	if(!!error){
    		console.log('Error in the query');
            throw new Error("Error in the query");
    	}
    	else{
    	  if(rows[0].password === password){
    		  //res.send("Success");
    		  var sql1 = "UPDATE user SET password='"+newpassword+"' WHERE user_id="+user_id;
    		  connection.query(sql1, function(error,rows,fields){
    			  console.log(sql1);
    			  if(!!error){
    				  console.log("Error in query");
                      throw new Error("Error in the query");
    			  }
    			  else{
    				  res.send(true);
    			  }
    		  });
    	  }
    	  else{
    		  res.send(false);
    	  }
    	}
    });

    },function(err){
    //console.log(err.stack);
    res.send(false);
  });
};