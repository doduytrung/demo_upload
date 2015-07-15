//define dependencies
var express=require("express");
var multer=require("multer");
var app=express();
var doneFlag=false;

//configure the multer
app.use(multer({dest:"./upload/",
		rename:function(fieldname,filename){
				return filename+Date.now();
		},
		onFileUploadStart:function(file){
			console.log(file.originalname+' is starting...');
		},
		onFileUploadComplete:function(file){
			console.log(file.fieldname+' uploaded to '+file.path);

			doneFlag=true;
		}
	}));

//handling routers
app.get('/',function(req,res){
	res.sendfile("index.html");
});

app.post('/api/photo',function(req,res){
	if(doneFlag==true){
		console.log(req.files);
		console.log("CONTENT:"+ req.body['description']);
		console.log("CONTENT:"+ req.body['password']);
		console.log(JSON.stringify(req.body));
		console.log('req.body.description', req.body['description']);
		res.end("File uploaded!");
	}else{
		console.log('OK');
	}
});

app.listen(3000,function(){
	console.log("Working on port 3000");
});
