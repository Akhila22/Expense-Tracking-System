exports.loginFun=function(req, res){

	trycatch(function(){
			var temp = Object.keys(req.body);
	    var json = JSON.parse(temp);
	    console.log(json);

	    var email = json.email;
	    var password = json.user;
	    var sql = "select role_id,user_id,username,password from user where username='"+email+"' and password='"+password+"'";
		
	    connection.query(sql, function(error,rows,fields){
	      if(!!error){
	        console.log('Error in the query');
	      }else{
	       
	        req.session.user_id = rows[0].user_id;
	        req.session.role_id = rows[0].role_id;
	       // req.session.username= rows[0].username;
	       // req.session.password=rows[0].password;
	        
	        	var temp = String(req.session.role_id)
	        	res.send(temp);
	       
	      }
	    });

	},function(err){
		console.log(err.stack);
		res.send(false);
	});
		
	
};