var uuid =require('uuid');
exports.sendmailnotify = function(req,res,quarter_number,quarter_budget,user_email,admin_email,category_name,financial_year){

    trycatch(function(){
    	
        	
server.start();
// create reusable transporter object using SMTP transport


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'boddupalliaditya@gmail.com',
            pass: 'maheshbabu1'
        }
    }); 
    var email_id_pat = user_email+","+admin_email;
    console.log(user_email);
    console.log(email_id_pat);
    
var maillist=email_id_pat;
// setup e-mail data with unicode symbols
    var mailOptions = {
// sender address
        from: 'boddupalliaditya@gmail.com', 
// list of receivers
        to: maillist, 
// Subject line
        subject: 'Mail from CA Education Team', 
// plaintext body
        text: 'It works ?',
// rich text html body
        html: "<p>Budget for quarter Q"+quarter_number+" has exceeded for category "+cat_name+". Remaining quarter budget = "+quarter_budget+" for financial year "+financial_year+"</p>",
        
    };
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
},function(err){
        console.log(err.stack);
        res.send(false);
    });
};