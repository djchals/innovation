const express=require('express');
const morgan=require('morgan');
const path=require('path');//este módulo sirve para poder escribir rutas y que sea multiplataforma
const bodyParser = require('body-parser');//necesario para que le lleguen las variables desde los formularios a req.body

const rendererFns = require('./src/lib/rendererFns.js')

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


app.all('*', filterAllPaths)
//routes
app.use('/',require('./src/routes/expressRoutes.js'));//estas serán las rutas que empleará express

//404
app.use(function(req, res){
	res.status(404).sendFile(path.join(__dirname,'./src/public/404.html'));
});

//starting the server
app.listen(app.get('port'),()=>{
	console.log(app.get('port'));
});

function filterAllPaths(req,res,next){

console.log(req.url)
if(rendererFns.isBot()){
	console.log("es un bot")
}else{
	console.log("NO NO NO")
}
let cacheFileName = rendererFns.isInCache(req.url)
if(cacheFileName) {
	res.send(rendererFns.getCacheFileContent(cacheFileName))
	console.log('se ha encontrado')
} else {
	console.log('no se ha encontrado')
}
console.log(rendererFns.isInCache(req.url))

	//console.log(req.url)
	//console.log(req.url)
	next()
}
