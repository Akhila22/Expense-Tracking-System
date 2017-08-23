// var express=require('express');
// var mysql=require('mysql');
// var bodyParser = require('body-parser');
// var app=express();

// var connection=mysql.createConnection({

//                host:'localhost',user:'root',password:'datacon12',database:'expensetracking'
// });
// connection.connect(function(error){
//                if(!!error){
//                               console.log('Error');
//                }else{
//                               console.log('Connected to category');
//                }
// });
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// next();
// });

exports.getFinYears = function(req,res){
       var sql = "SELECT financial_year FROM budget;";
       connection.query(sql,function(error,rows,fields){
             if(!!error){
                    console.log('Error in the query');
             }
             else{
                    console.log(rows);
                    res.send(rows);
             }
       })
}
