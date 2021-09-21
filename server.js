const express=require('express');
const morgan=require('morgan');
const path=require('path');//este módulo sirve para poder escribir rutas y que sea multiplataforma
const bodyParser = require('body-parser');//necesario para que le lleguen las variables desde los formularios a req.body

require('dotenv').config();//requerimos la configuración para poder tratar con el archivo .env

//initializations
const app=express();
require('./src/models/database.js');
//settings
app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());//inicializamos aquí el body-parser para los formularios

app.use(express.urlencoded({extended: false}));//mediante urlencoded podemos recibir los datos recibidos del cliente antes de procesarlos en las rutas. Por ejemplo: variables POST

//routes
app.use('/',require('./src/routes/expressRoutes.js'));//le decimos a express que use el directorio raiz como base

app.use(function(req, res){
	console.log(path.join(__dirname,'./src/public/404.html'));
	res.status(404).sendFile(path.join(__dirname,'./src/public/404.html'));
});

//starting the server
app.listen(app.get('port'),()=>{
	console.log(app.get('port'));
});
