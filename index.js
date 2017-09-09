/*jshint -W020 */
express = require("express");
app = express();
trycatch = require("trycatch");
mysql = require("mysql");
path = require("path");
session = require("express-session");
var bodyParser = require("body-parser");
var port = 1337;
nodemailer = require("nodemailer");
server = require("./controllers/start");
mail = "";
pass = "";

connection = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "expensetracking"
});

connection.connect(function(error) {
    if (error) {
        console.log("Error Connecting to Database\n" + error);
    }
    else {
        console.log("Connected to Database");
    }
});

//app.use(cookieParser());
app.use(function(req, res, next) {
    res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
    next();
});

var helmet = require("helmet");
app.use(helmet());
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

var budget = require("./controllers/addbudget");
var category = require("./controllers/addcategory");
var finYear = require("./controllers/getfinancialyears");
var expense = require("./controllers/addexpense");
var newuser = require("./controllers/adduser");
var login = require("./controllers/login");
var validatepwd = require("./controllers/validatepwd");
var report = require("./controllers/report");
var getExpenses = require("./controllers/getexpenses");
var mailer = require("./controllers/mailer");
var start = require("./controllers/start");
var updatepasswd = require("./controllers/updatepasswd");
mailernotify = require("./controllers/mailernotify");
var forpass = require("./controllers/forgot_password");

app.get("/forgotpass",function(req,res) {
    res.sendFile(path.join(__dirname, "/views/forgotpass.html"));
});

app.post("/fpass",function(req,res) {
    //alert();
    //console.log("welcome to category");
    //console.log("server " + req.body.category_name);
    console.log("fpass");
    forpass.forgotpassword(req,res);
});

app.get("/email",function(req,res) {
    res.setHeader("Content-Type", "text/html");
    var urlParts = url.parse(req.url,true);
    var query = urlParts.query;
    mail = req.query.recoveryemail;
    mailer.sendmail(req,res);
    return res.sendFile(path.join(__dirname, "/views/login.html"));
});

//app.get("/notify",function(req,res){
//mailernotify.sendmailnotify(req,res);
//res.send(true);
//});

app.get("/",function(req,res) {
    res.send("Welcome!!");
});

app.post("/log",function(req,res) {
    console.log("welcome to login");
    login.loginFun(req,res);
});

app.post("/budget",function(req,res) {
    //console.log("welcome to budget");
    budget.addbudget(req,res);
});

app.post("/newuser",function(req,res) {
    //console.log("welcome to budget");
    newuser.addnewuser(req,res);
});

app.put("/checkPwd",function(req,res) {
    //console.log("welcome to budget");
    validatepwd.validatePassword(req,res);
});

app.put("/updatepasswd",function(req,res) {
    newpassword = mailer.newpassword;
    console.log(req.body);
    updatepasswd.updatepassword(req,res);
});

app.get("/changepwd",function(req,res) {
    res.sendFile(path.join(__dirname, "/views/change_password.html"));
});

app.get("/getexptbl",function(req,res) {
    res.sendFile(path.join(__dirname, "/views/expensetable.html"));
});

app.get("/getexpenses",function(req,res) {
    getExpenses.getExpenseTbl(req,res);
});

app.get("/getExpDate",function(req,res) {
    getExpenses.getExpenseDateTbl(req,res);
});

app.get("/allcategories",function(req,res) {
    getExpenses.getAllCategories(req,res);
});

app.post("/delexpense",function(req,res) {
    getExpenses.delExpenseTbl(req,res);
});

app.post("/category",function(req,res) {
    //console.log("welcome to category");
    //console.log("server " + req.body.category_name);
    category.addcategory(req,res);
});

app.get("/getcategory",function(req,res) {
    //res.send("working");
    category.getCatNames(req,res);
});

app.post("/expenses",function(req,res) {
    //console.log("welcome to expenses");
    //console.log("server " + req.body.category_name);
    expense.addExp(req,res);
});

app.get("/addexpense",function(req,res) {
    if (typeof req.session.roleId === "undefined") {
        res.redirect("/login");
    }
    else {
        res.sendFile(path.join(__dirname, "/views/addexpense.html"));
    }
});

app.get("/addcategory",function(req,res) {
    if (req.session.roleId === 1) {
        res.sendFile(path.join(__dirname, "/views/addcategory.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/newreport",function(req,res) {
    res.sendFile(path.join(__dirname, "/views/report.html"));
});

app.get("/addbudget",function(req,res) {
    if (req.session.roleId === 1) {
        res.sendFile(path.join(__dirname, "/views/addbudget.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/adduser",function(req,res) {
    if (req.session.roleId === 1) {
        res.sendFile(path.join(__dirname, "/views/adduser.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/logout",function(req,res) {
    req.session.destroy();
    res.redirect("/login");
});

app.get("/adminLogin",function(req,res) {
    if (req.session.roleId === 1) {
        res.sendFile(path.join(__dirname, "/views/admin_login.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/adminHome",function(req,res) {
    if (req.session.roleId === 1) {
        res.sendFile(path.join(__dirname, "/views/admin_home.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/userLogin",function(req,res) {
    if (req.session.roleId === 2) {
        res.sendFile(path.join(__dirname, "/views/user_login.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/userHome",function(req,res) {
    if (req.session.roleId === 2) {
        res.sendFile(path.join(__dirname, "/views/user_home.html"));
    }
    else {
        res.redirect("/logout");
    }
});

app.get("/login",function(req,res) {
    //console.log(req.session.userId);
    if (typeof req.session.userId === "undefined") {
        // console.log("if loop");
        res.sendFile(path.join(__dirname, "/views/login.html"));
    }
    else {
        //console.log("Already logged in");
        if (req.session.roleId === 1) {
            res.redirect("/adminLogin");
        }
        else if (req.session.roleId === 2) {
            res.redirect("/userLogin");
        }
    }
});

app.get("/financialYear",function(req,res) {
    // console.log("Financial Years");
    finYear.getFinYears(req,res);
    //res.redirect("/login");
});

app.get("*", function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    if (err.status !== 404) {
        return next();
    }
    res.send(err.message || "<h1>Error 404<br>Page Not Found</h1>");
});

app.listen(port,function(err) {
    if (err) {
        console.log("Error listenting on port " + port);
    }
    else {
        console.log("Sever running on " + port);
    }
});
