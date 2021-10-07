const express=require('express');
const morgan=require('morgan');
const path=require('path');//este módulo sirve para poder escribir rutas y que sea multiplataforma
const bodyParser = require('body-parser');//necesario para que le lleguen las variables desde los formularios a req.body
require('dotenv').config();//requerimos la configuración para poder tratar con el archivo .env

//initializations
const app=express();

//DB connect 
require('./src/app/DBConnect.js');

//settings
app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());//inicializamos aquí el body-parser para los formularios

app.use(express.urlencoded({extended: false}));//mediante urlencoded podemos recibir los datos recibidos del cliente antes de procesarlos en las rutas. Por ejemplo: variables POST


app.all('*', muestralo)
//routes
app.use('/',require('./src/routes/expressRoutes.js'));//estas serán las rutas que empleará express

//404
app.use(function(req, res){
	console.log(path.join(__dirname,'./src/public/404.html'));
	res.status(404).sendFile(path.join(__dirname,'./src/public/404.html'));
});

//starting the server
app.listen(app.get('port'),()=>{
	console.log(app.get('port'));
});

function muestralo(req,res,next){
	//console.log(req.url)
	console.log(req.url)
	console.log("si estoy montrs")
	next()
}
