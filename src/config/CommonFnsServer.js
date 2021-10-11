class CommonFnsServer{
	//cookies
	constructor(){
		this.self=this;
	}
	createCfg(res,myCfg){
		//myCfg contiene: language dateFormat name
		res.cookie('cfg', myCfg, { maxAge: 900000 });
	}
	clearCfg(res){
		res.clearCookie("cfg");
	}
	//formateo 
	capitalize(word){
		return word[0].toUpperCase() + word.slice(1);
	}
	formatText(text){
		text=text.trim();
		text=text.toLowerCase();
		return text;
	}
	cleanText(text){
		let tmp=text.trim();
		tmp=tmp.replace(/(<([^>]+)>|\n|\t|\r|  |\"|\')/gi, "");
		return tmp;
	}
	cleanBody(obj){
		for (let i of Object.keys(obj)) {
			obj[i] = this.cleanText(obj[i]);
		}
		return obj;
	}
	chkCharsPass(pass){
		let pattern=new RegExp(/^[A-Za-z0-9]+$/g);
		return pattern.test(pass);
	}
	chkEmail(text){
		let pattern=new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
		return pattern.test(text);
	}
	formatDate(timeUnix,dateFormat,onlyDate){
		let x=new Date(timeUnix);
		let dateReturn=x.toISOString();
		var ymd="";
		
		if(!dateFormat || dateFormat=='en'){
			ymd=dateReturn.substring(0,10);
		}else if(dateFormat=='sp'){
			let day=dateReturn[8]+dateReturn[9];
			let month=dateReturn[5]+dateReturn[6];
			let year=dateReturn[0]+dateReturn[1]+dateReturn[2]+dateReturn[3];
			ymd=day+'-'+month+'-'+year;
		}
		//if this parameter is defined, doesnt return hms
		if(onlyDate){
			return ymd;
		}
		let hour=dateReturn[11]+dateReturn[12];
		let minutes=dateReturn[14]+dateReturn[15];
		let seconds=dateReturn[17]+dateReturn[18];
		dateReturn=ymd+' '+hour+':'+minutes+':'+seconds;
		
		return dateReturn;
	}
	async sendContact(req,res,next){
		const sendEmail=require('../config/sendEmail.js');
		req.body=commonFnsServer.cleanBody(req.body);
		let flag=true
		if(req.body.name=='' || req.body.email=='' || req.body.subject=='' || req.body.message==''){
			flag=false;
		}
		if(flag && !commonFnsServer.chkEmail(req.body.email)){
			flag=false;
		}
		if(flag){
			//Enviamos el email al admin
			let etSubject={};
			let etMessage={};
			etSubject.contact=req.body.subject;
			etMessage.contact="Hola Admin,\n";
			etMessage.contact+="Desde la web hemos recibido este mensaje de contacto:\n\n";
			if(req.body.userId){
				etMessage.contact+="Usuario: "+req.body.userId+"\n";
			}
			etMessage.contact+="Nombre: "+req.body.name+"\n";
			etMessage.contact+="Correo electrónico: "+req.body.email+"\n";
			etMessage.contact+="Asunto: "+req.body.subject+"\n";
			etMessage.contact+=req.body.message;
			
			let email=new sendEmail(req.body.name,req.body.email,process.env.EMAILADMIN,etSubject.contact,etMessage.contact);
			let flagSent=await email.send().catch(console.error);
			//
			
			//Enviamos el correo automático al usuario
			let etFromName="AutoExaming";
			etSubject.contactUser="Mensaje de contacto recibido";
			etMessage.contactUser="Hola "+req.body.name+",\n\n";
			etMessage.contactUser+="Este es solo un mensaje informativo confirmándote que hemos recibido tu mensaje de contacto correctamente. Si el mensaje lo requiere nos pondremos en contacto contigo a la mayor brevedad posible.\n\n";
			etMessage.contactUser+="Recibe un cordial saludo,\n\n";
			etMessage.contactUser+="Equipo de AutoExaming\n";
			etMessage.contactUser+="Este es un mensaje automatizado, por favor no respondas.\n";

			email=new sendEmail(etFromName,process.env.EMAILADMIN,req.body.email,etSubject.contactUser,etMessage.contactUser);
			flagSent=await email.send().catch(console.error);
			//
			
			if(!req.body.userId){
				res.render('genericMsg.ejs',{
					data: {
						metaTitle: 'Contacto',
						metaDescription: "¡Hemos recibido correctamente tu mensaje!",
						title: "¡Hemos recibido correctamente tu mensaje!",
						text: ["Agradecemos que nos envíes lo que piensas, o nos reportes algún problema.","Si el mensaje lo requiere nos pondremos en contacto contigo a la mayor brevedad posible."]
					}
				});
			}else{
				//lo hemos enviado a través del form del dashboard
				return true;
			}
		}else{
			if(!req.body.userId){
				res.redirect('/');
			}else{
				return false;
			}
		}
	}
}

const commonFnsServer=new CommonFnsServer();
module.exports = commonFnsServer;
