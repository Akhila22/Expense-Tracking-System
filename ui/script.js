var express=require('express');
var mysql=require('mysql');
var app=express();
var path=require('path');

var connection=mysql.createConnection({

               host:'localhost',user:'root',password:'',database:'sampleDB'
});

connection.connect(function(error){
               if(!!error){
                              console.log('Error');
               }else{
                              console.log('Connected');
               }
});
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/',function(req,resp){
               connection.query("Select * from mySampleTable",function(error,rows,fields){
                              if(!!error){
                                             console.log('Error in the query');
                              }else{
                                             console.log('Successful query');
                                             //resp.send('hello'+rows[0].Name);

                              }
               });
})



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

app.listen(1337);


