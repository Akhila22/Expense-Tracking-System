var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path'),
    bodyParser = require('body-parser');
    port = 1337;

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'expensetracking'
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
});

app.route('/authenticate')
   .post(function(req, res){
    var email = req.body.email;
    var password = req.body.user;
    var userrole = req.body.userrole;
    connection.connect(function(error){
      if(!!error){
        console.log('Error');
      }else{
        console.log('Connected');

      }
    });
    var sql = "insert into user(username,password,role_id) values('"+ email +"','"+ password +"',"+ userrole +")";
    console.log(sql);
    connection.query(sql, function(error,rows,fields){
      if(!!error){
        console.log('Error in the query');
      }else{
        console.log('Inserted Successfully');
        //resp.send('hello'+rows[0].Name);
      }
    });
  });

app.get('/index',function(req,resp){
    resp.sendFile(__dirname+"/index.html");
  });
app.get('/login',function(req,resp){
    resp.sendFile(__dirname+"/login.html");
  });

app.get('/addcategory',function(req,resp){
    resp.sendFile(__dirname+"/addcategory.html");
  });
app.get('/addexpense',function(req,resp){
    resp.sendFile(__dirname+"/addexpense.html");
  });
app.get('/adduser',function(req,resp){
    resp.sendFile(__dirname+"/adduser.html");
  });

app.get('*', function(req, res, next){
  var err = new Error();
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if(err.status !== 404){
    return next();
  }
  res.send(err.message || '<h1>Error 404<br>Page Not Found</h1>');
});

app.listen(port,function(){
  console.log('Sever running on ' + port);
});
