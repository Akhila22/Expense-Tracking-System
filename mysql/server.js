express = require('express');
trycatch = require('trycatch');
app = express();
mysql = require('mysql');
path = require('path'),
session = require('express-session'),
bodyParser = require('body-parser'),
port = 1337;
//require('ssl-root-cas').inject();
url = require('url');
nodemailer = require('nodemailer');
server = require('./start');
mail='';
pass='';

connection = mysql.createConnection({
  host : '127.0.0.1',
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
app.use(function(req, res, next) {
	  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	  next();
	});

app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

var budget=require('./addbudget.js');
var category=require('./addcategory.js');
var finYear = require('./getfinancialyears.js');
var expense = require('./addexpense.js');
var newuser=require('./adduser.js');
var login=require('./login.js');
var validatepwd = require('./validatepwd.js');
var report=require('./report.js');
var getExpenses = require('./getexpenses.js')
var mailer = require('./mailer.js');
var start = require('./start');
var uuid = require('uuid');
var updatepasswd = require('./updatepasswd.js');
mailernotify = require('./mailernotify.js');
var forpass=require('./forgot_password.js');



app.get('/forgotpass',function(req,res){
   res.sendFile(__dirname+"/forgotpass.html");

});

app.post('/fpass',function(req,res){
  //alert();
  //console.log("welcome to category");
  //console.log("server " + req.body.category_name);
  console.log("fpass");
  forpass.forgotpassword(req,res);
});


app.get('/email',function(req,res){
     res.setHeader("Content-Type", "text/html")
  var url_parts = url.parse(req.url,true);
  var query = url_parts.query;
    mail = req.query.recoveryemail;
mailer.sendmail(req,res);
return res.sendFile(__dirname+"/login.html");
});


//app.get('/notify',function(req,res){
//mailernotify.sendmailnotify(req,res);
//res.send(true);
//});


app.get('/',function(req,res){
	res.send("Welcome!!");
});

app.post('/log',function(req,res){
  console.log("welcome to login");
  login.loginFun(req,res);

});

app.post('/budget',function(req,res){
	//console.log("welcome to budget");
	budget.addbudget(req,res);

});

app.post('/newuser',function(req,res){
  //console.log("welcome to budget");
  newuser.addnewuser(req,res);

});

app.put('/checkPwd',function(req,res){
  //console.log("welcome to budget");
  validatepwd.validatePassword(req,res);

});

app.put('/updatepasswd',function(req,res)
{
  newpassword = mailer.newpassword;
  console.log(req.body);
updatepasswd.updatepassword(req,res);
});


app.get('/changepwd',function(req,res){

      res.sendFile(__dirname+"/change_password.html");

});

app.get('/getexptbl',function(req,res){

    res.sendFile(__dirname+"/expensetable.html");

});

app.get('/getexpenses',function(req,res){
	getExpenses.getExpenseTbl(req,res);
});

app.get('/getExpDate',function(req,res){
	getExpenses.getExpenseDateTbl(req,res);
});

app.get('/allcategories',function(req,res){
	getExpenses.getAllCategories(req,res);
});

app.post('/delexpense',function(req,res){
	getExpenses.delExpenseTbl(req,res);
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

app.get('/newreport',function(req,res){
      res.sendFile(__dirname+"/report.html");
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
