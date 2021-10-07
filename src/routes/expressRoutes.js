const express=require('express');
const router=express.Router();
const path=require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;//necesario como antihack por si a alguien le da por meter algo raro en vez de la Id

const userAgent = require('../lib/userAgent.js')

if(userAgent.isBot()){
	console.log("es un bot")
}else{
	console.log("NO NO NO")
}

//configuramos aquí los middlewares
router.use(express.static(path.join(__dirname,'../public')));//
const routeIndex=path.join(__dirname,'../public/index.html');//este será el archivo en el que renderizaremos los componentes

const People=require('../models/peoples.js');
const Starship=require('../models/starships.js');
const Planet=require('../models/planets.js');

require('dotenv').config();//requerimos la configuración para poder tratar con el archivo .env

/////////////////////////////////////////////////////// HOME ///////////////////////////////////////////////////////////////////
router.get('/',(req,res,next)=>{
	res.sendFile(routeIndex);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// PEOPLE ///////////////////////////////////////////////////////////////////
router.get('/people-list',(req,res,next)=>{
	res.redirect('/people-list-name-asc');//le pasamos los que deberían ser los parámetros por defecto de order y sort y lo redireccionamos a la url correcta
});

router.get('/people-list-:order(name|age|height|eyeColor)-:sort(asc|dsc)',(req,res,next)=>{
	res.sendFile(routeIndex);
});

router.post('/people-list',async(req,res,next)=>{
	//vienen req.body.order y req.body.sort
	let order=((req.body.order!='name' && req.body.order!='age' && req.body.order!='height' && req.body.order!='eyeColor')?'name':req.body.order);
	let sort=(req.body.sort=='dsc')?-1:1;
// 	
	const arrReturn=await People.find().sort(JSON.parse('{"'+order+'": '+sort+'}')).exec();//estas dos variables es de lo que nos va a 
	
	res.send({arrPeople: arrReturn});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// STARSHIPS ///////////////////////////////////////////////////////////////////
router.get('/starship-list',(req,res,next)=>{
	res.redirect('/starship-name-asc');//le pasamos los que deberían ser los parámetros por defecto de order y sort y lo redireccionamos a la url correcta
});

router.get('/starship-list-:order(name|weight|manufacturer|yearConstruction)-:sort(asc|dsc)',(req,res,next)=>{
	res.sendFile(routeIndex);
});

router.post('/starship-list',async(req,res,next)=>{
	//vienen req.body.order y req.body.sort
	let order=((req.body.order!='name' && req.body.order!='weight' && req.body.order!='manufacturer' && req.body.order!='yearConstruction')?'name':req.body.order);
	let sort=(req.body.sort=='dsc')?-1:1;
// 	
	const arrReturn=await Starship.find().sort(JSON.parse('{"'+order+'": '+sort+'}')).exec();//estas dos variables es de lo que nos va a 
	
	res.send({arrStarship: arrReturn});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// PLANETS ///////////////////////////////////////////////////////////////////
router.get('/planet-list',(req,res,next)=>{
	res.redirect('/planet-list-name-asc');//le pasamos los que deberían ser los parámetros por defecto de order y sort y lo redireccionamos a la url correcta
});

router.get('/planet-list-:order(name|weight|diameter|numSatelites)-:sort(asc|dsc)',(req,res,next)=>{
	res.sendFile(routeIndex);
});

router.post('/planet-list',async(req,res,next)=>{
	//vienen req.body.order y req.body.sort
	let order=((req.body.order!='name' && req.body.order!='weight' && req.body.order!='diameter' && req.body.order!='numSatelites')?'name':req.body.order);
	let sort=(req.body.sort=='dsc')?-1:1;
// 	
	const arrReturn=await Planet.find().sort(JSON.parse('{"'+order+'": '+sort+'}')).exec();//estas dos variables es de lo que nos va a 
	
	res.send({arrPlanet: arrReturn});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// PROFILE ///////////////////////////////////////////////////////////////
router.get('/:typeProfile(people|starship|planet)-profile-:profileId([0-9a-f]{24})',(req,res,next)=>{
	res.sendFile(routeIndex);
});

router.post('/get-profile',async(req,res,next)=>{
	let profile;
	
	switch(req.body.profileType){
		case 'people':
			profile=await People.findOne({_id: ObjectId(req.body.profileId)}).select("-_id");
			res.send({profile});
			break;
		case 'starship':
			profile=await Starship.findOne({_id: ObjectId(req.body.profileId)}).select("-_id");
			res.send({profile});
			break;
		case 'planet':
			profile=await Planet.findOne({_id: ObjectId(req.body.profileId)}).select("-_id");
			res.send({profile});
			break;
		default:
			res.send({profile: false});
			break;
	}
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports=router;
