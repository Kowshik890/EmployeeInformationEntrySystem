const express=require("express");
const bodyParser=require("body-parser");

// API routes declaration
const employeeAPIRoutes = require("./routes/EmployeeApi");

// Node Connection started here
const mongoose=require("mongoose");
const cors=require("cors");

mongoose.connect('mongodb://localhost:27017/employeedb', { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});;
mongoose.Promise=global.Promise;

//set upp express app
const app=express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Declared the routes variables
app.use(cors());
app.use(employeeAPIRoutes);




// for getting response/notification after connecting to DB or not
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
})
//listen for requests

app.listen(3000,function(){
    console.log("listening for request");
});


app.get('/',function(){
    console.log("get request");
});