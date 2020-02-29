var http = require('http');
var express = require('express');
var app = express();
var server= http.Server(app);
const CURRENT_WORKING_DIR = process.cwd()
var path = require('path');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const multer = require("multer") 

var mongo = require('mongodb')
var mongoose = require('mongoose')
var db, uri = "mongodb+srv://sajid9505:mongoDB1234@cluster0-ebrcf.mongodb.net/Porjobaekkhon?retryWrites=true&w=majority"
mongoose.connect(uri, 
    {useNewUrlParser:true, useUnifiedTopology: true })
    mongoose.connection.on('connected', function(){
          console.log("connected")
    });
mongoose.connection.on('error', function(err){
    console.log('Could not connect to MongoDB')
})



// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 

// --------------- File upload --------------
    
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "uploads") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".dwg") 
    } 
  }) 
       
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 1 * 1000 * 1000; 
    
var upload = multer({  
    storage: storage, 
    // limits: { fileSize: maxSize }, 
    // fileFilter: function (req, file, cb){ 
    
    //     // Set the filetypes, it is optional 
    //     var filetypes = /jpeg|jpg|png/; 
    //     var mimetype = filetypes.test(file.mimetype); 
  
    //     var extname = filetypes.test(path.extname( 
    //                 file.originalname).toLowerCase()); 
        
    //     if (mimetype && extname) { 
    //         return cb(null, true); 
    //     } 
      
    //     cb("Error: File upload only supports the "
    //             + "following filetypes - " + filetypes); 
    //   }  
  
// mypic is the name of file attribute 
}).single("mypic");        

// app.get("/",function(req,res){ 
//     res.render("Signup"); 
// }) 


// ------------- Routing --------------
    
app.post("/uploadProfilePicture",function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
            res.send("Success, Image uploaded!") 
        } 
    }) 
}) 
    

app.use('/public', express.static(path.join(CURRENT_WORKING_DIR, 'public')))

app.get('/',function(request,response){
    response.sendFile(__dirname + '/views/login.html')
})

app.get('/signup',function(request,response){
    response.sendFile(__dirname + '/views/Signup.html')
})

app.get("/projectsub",function(req,res){ 
    res.render("projectsub"); 
}) 

app.get('/dashboard',function(request,response){
    response.sendFile(__dirname + '/views/dashboard.html')
})

app.post('/submit',function(request,response){
    // response.sendFile(__dirname + '/views/singleview.html')
})

server.listen(3000,'localhost',function(){
    console.log('server running ...')
})