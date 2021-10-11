const express=require('express');
const router=express.Router();
const path=require('path');
const pool = require('../app/MySQLConnect.js');
const commonFnsServer=require('../config/CommonFnsServer.js');
//configuramos aquí los middlewares
router.use(express.static(path.join(__dirname,'../public')));//
const routeIndex=path.join(__dirname,'../public/index.html');//este será el archivo en el que renderizaremos los componentes

// const People=require('../models/peoples.js');
// const Starship=require('../models/starships.js');
// const Planet=require('../models/planets.js');

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
	
	const arrReturn = await pool.query('SELECT * FROM t_peoples');
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

	const arrReturn = await pool.query('SELECT * FROM t_starships');	
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
	const arrReturn = await pool.query('SELECT * FROM t_planets');
	
	res.send({arrPlanet: arrReturn});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// PROFILE ///////////////////////////////////////////////////////////////
router.get('/:profileType(people|starship|planet)-profile-:profileId([0-9]*)',(req,res,next)=>{
	res.sendFile(routeIndex);
});

router.post('/get-profile',async(req,res,next)=>{
	switch(req.body.profileType){
		case 'people':
		case 'starship':
		case 'planet':
			const profile = await pool.query('SELECT * FROM t_'+req.body.profileType+'s WHERE id = ?', [req.body.profileId]);
			res.send({profile: profile[0]});
			break;
		default:
			res.send({profile: false});
			break;
	}
});


router.get('/:profileType(people|starship|planet)-profile-edit-:profileId([0-9]*)',(req,res,next)=>{
	res.sendFile(routeIndex);
});

router.post('/profile-edit', async(req,res,next)=>{
    req.body = commonFnsServer.cleanBody(req.body)

    let strUpdateVars=''
    switch(req.body.profileType) {
	case 'people':
	    strUpdateVars=" name='"+req.body.name+"', age='"+req.body.age+"', height='"+req.body.height+"', eyeColor='"+req.body.eyeColor+"'"
	    break
	case 'planet':
	    strUpdateVars=" name='"+req.body.name+"', weight='"+req.body.weight+"', diameter='"+req.body.diameter+"', numSatelites='"+req.body.numSatelites+"'"
	    break
	case 'starship':
	    strUpdateVars=" name='"+req.body.name+"', weight='"+req.body.weight+"', manufacturer='"+req.body.manufacturer+"', yearConstruction='"+req.body.yearConstruction+"'"	    
	    break
    }
    if(strUpdateVars != '') {
	pool.query("update t_"+req.body.profileType+"s set "+strUpdateVars+" where id='"+req.body.profileId+"' limit 1")
	res.send({saved: true})
    }
})
router.post('/profile-add', async(req,res,next)=>{
    req.body = commonFnsServer.cleanBody(req.body)

    let strInsertVars = ''
    let strInsertFields = ""
    switch(req.body.profileType) {
	case 'people':
	    strInsertVars="'"+req.body.name+"','"+req.body.age+"','"+req.body.height+"','"+req.body.eyeColor+"'"
	    strInsertFields = "name,age,height,eyeColor"
	    break
	case 'planet':
	    strInsertVars="'"+req.body.name+"','"+req.body.weight+"','"+req.body.diameter+"','"+req.body.numSatelites+"'"
	    strInsertFields = "name,weight,diameter,numSatelites"
	    break
	case 'starship':
	    strInsertVars="'"+req.body.name+"','"+req.body.weight+"','"+req.body.manufacturer+"','"+req.body.yearConstruction+"'"	    
	    strInsertFields = "name,weight,manufacturer,yearConstruction"
	    break
    }
    if(strInsertVars != '') {
	pool.query("insert into t_"+req.body.profileType+"s ("+strInsertFields+") values ("+strInsertVars+")")
	res.send({saved: true})
    }
})
router.get('/:profileType(people|starship|planet)-profile-add',(req,res,next)=>{
	res.sendFile(routeIndex);
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports=router;
