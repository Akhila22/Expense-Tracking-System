exports.updatepassword = function(req,res){
	//var user_id = req.session.user_id;

    trycatch(function(){
    var uuid = require('uuid');
var newpassword = uuid.v1();  
	var temp = Object.keys(req.body);
    var json = JSON.parse(temp);
    var user_name = json.mail;
    console.log(user_name);
    
     res.setHeader("Content-Type", "text/html")
    		  var sql1 = "UPDATE user SET password='"+newpassword+"' WHERE username='"+user_name+"'";
    		  connection.query(sql1, function(error,rows,fields){
    			  console.log(sql1);
    			  if(!!error){
    				  console.log("Error in query");
                      throw new Error("Error in the query");
    			  }
    			  else{
                    true;
    			  }
    		  });
               },function(err){
    //console.log(err.stack);
    res.send(false);
  });
    	  
    };