express = require('express');

app = express();
mysql = require('mysql');
path = require('path'),
session = require('express-session'),
bodyParser = require('body-parser'),
port = 1337;
url = require('url');

var budget=require('./addbudget.js');
var category=require('./addcategory.js');
var finYear = require('./getfinancialyears.js');
var expense = require('./addexpense.js');

connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'expensetracking'
});

connection.connect(function(error){
	  if(!!error){
	    console.log("new user\n" +error);
	  }else{
	    console.log('Connected');
	  }
});

//app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
	res.send("Welcome!!");
});

app.route('/newuser')
.post(function(req, res){
	//console.log(req.body);
	var email = req.body.email;
	var password = req.body.user;
	var userrole = req.body.userrole;
    var sql = "insert into user(username,password,role_id) values('"+ email +"','"+ password +"',"+ userrole +")";
   // console.log(sql);
    connection.query(sql, function(error,rows,fields){
      if(!!error){
        console.log('Error in the query');
      }else{
        console.log('Inserted Successfully');
      }
    });
});

app.route('/authenticate')
   .post(function(req, res){
    var email = req.body.email;
    var password = req.body.user;
    var sql = "select role_id,user_id,username from user where username = '"+ email +"' and password = '"+ password +"'";
   // console.log(sql);
    connection.query(sql, function(error,rows,fields){
      if(!!error){
        console.log('Error in the query');
      }else{
       
        req.session.user_id = rows[0].user_id;
        req.session.role_id = rows[0].role_id;

        if( req.session.role_id ==1)
        	res.redirect('/adminLogin');
        if( req.session.role_id ==2)
        	res.redirect('/userLogin');
      }
    });
});

app.post('/budget',function(req,res){
	//console.log("welcome to budget");
	budget.addbudget(req,res);
  
});

app.post('/category',function(req,res){
	//console.log("welcome to category");
	//console.log("server " + req.body.category_name);
	category.addcategory(req,res);
});

app.get('/getcategory',function(req,res){
  //res.send("working");
  category.getCatNames(req,res);
});

app.post('/expenses',function(req,res){
  //console.log("welcome to expenses");
  //console.log("server " + req.body.category_name);
  expense.addExp(req,res);
});

app.get('/addexpense',function(req,res){
	if(typeof req.session.role_id == "undefined")
    	res.redirect('/login');
    else
    	res.sendFile(__dirname+"/addexpense.html");
 });

app.get('/addcategory',function(req,res){
	if(req.session.role_id==1)
    	res.sendFile(__dirname+"/addcategory.html");
    else
    	res.redirect('/logout');
 });

app.get('/addbudget',function(req,res){
	if(req.session.role_id==1)
    	res.sendFile(__dirname+"/addbudget.html");
    else
    	res.redirect('/logout');
 });
 
app.get('/adduser',function(req,res){
	if(req.session.role_id==1)
    	res.sendFile(__dirname+"/adduser.html");
    else
    	res.redirect('/logout');
    
});
app.get('/logout',function(req,res){
	req.session.destroy();
    res.redirect('/login');
 });

app.get('/adminLogin',function(req,res){
	if(req.session.role_id==1)
    	res.sendFile(__dirname+"/admin_login.html");
    else
    	res.redirect('/logout');
    
 });
app.get('/adminHome',function(req,res){
  if(req.session.role_id==1)
      res.sendFile(__dirname+"/admin_home.html");
    else
      res.redirect('/logout');
 });
app.get('/userLogin',function(req,res){
	if(req.session.role_id==2)
   		res.sendFile(__dirname+"/user_login.html");
   	else
    	res.redirect('/logout');
 });
app.get('/userHome',function(req,res){
  if(req.session.role_id==2)
      res.sendFile(__dirname+"/user_home.html");
    else
      res.redirect('/logout');
 });

app.get('/login',function(req,res){
	//console.log(req.session.user_id);
	if(typeof req.session.user_id == "undefined"){
	 // console.log("if loop");
	  res.sendFile(__dirname + "/login.html")
	} else {
	  //console.log("Already logged in");
	 if( req.session.role_id ==1)
	        	res.redirect('/adminLogin');
	 if( req.session.role_id ==2)
	        	res.redirect('/userLogin');
	}
});

app.get('/financialYear',function(req,res){
     //  console.log("Financial Years");
       finYear.getFinYears(req,res);
       //res.redirect('/login');
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
