exports.forgotpassword= function(req, res) {


  console.log("in js");
  trycatch(function(){
                console.log("temp1");
                var temp = Object.keys(req.body);
                console.log("temp");
               console.log("temp " + temp);
                var json = JSON.parse(temp);
                var sql0result;


                var email = json.recoveryemail;
                
                            //  console.log(req.body);
          var sql0="select user_id from user where username='"+email+"'";
           connection.query(sql0, function(error,rows,fields){
                                             if(!!error){
                                          console.log('Error in the query');
                                           throw new Error("Error in the query");
                                             }else
                                             {
                                              if(rows.length < 1)
                                             { 
                                              console.log(rows.length);
                                              //sql0result=rows[0].user_id;
                                              //console.log(sql0result);
                                              //res.send(true);
                                             
                                             
                                               console.log("user_not_there");
                                               res.send("user_not_there");
                                             }
                                              else
                                             {
                                              console.log("enteredelse");
                                              res.send(true);
                                              }
                                            }
          
         });
  },function(err){
      console.log(err.stack);
      res.send(false);
    });
};
