class CommonFns {
	constructor(){
		this.arrFilterNumWords=[5,10,15,20,25];
		this.maxCourses=3;
	}
	createRandKey(){
		return Math.round(Math.random()*100000);
	}
	toggleForm(bDisabled) { 
		var inputs = document.getElementsByTagName("input"); 
		for (var i = 0; i < inputs.length; i++) { 
			inputs[i].disabled = bDisabled;
		} 
		var selects = document.getElementsByTagName("select");
		for (var i = 0; i < selects.length; i++) {
			selects[i].disabled = bDisabled;
		}
		var textareas = document.getElementsByTagName("textarea"); 
		for (var i = 0; i < textareas.length; i++) { 
			textareas[i].disabled = bDisabled;
		}
		var buttons = document.getElementsByTagName("button");
		for (var i = 0; i < buttons.length; i++){
			buttons[i].disabled = bDisabled;
		}
	}
	toggleContent(flag){
		switch(flag){
			case 'loading':
				document.getElementById('loading-data').style.display="block";//show loading
				document.getElementById('container-data').style.display="none";
				break;
			case 'ready':
				document.getElementById('loading-data').style.display="none";
				document.getElementById('container-data').style.display="block";//show ready
				break;
		}
	}
	cleanText(text){
		if (typeof text === 'undefined' || text == false) {
			return ''
		}
		let tmp=text.trim();
		tmp=tmp.replace(/(<([^>]+)>|\n|\t|\r|  |\"|\')/gi, "");
		return tmp;
	}
	formatDate(timeUnix,dateFormat,onlyDate) {
		if(typeof timeUnix === 'undefined' || timeUnix < 0 || isNaN(timeUnix)) {
			return ''
		}
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
		}else {
			return ''
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
	formatTime(time){
		let cents=(Math.floor((time%1000)/10)).toString(),
		seconds=(Math.floor((time/1000)%60)).toString(), 
		minutes=(Math.floor(time/60000)).toString(); 

		return minutes+":"+((seconds.length==1)?'0':'')+seconds+":"+((cents.length==1)?'0':'')+cents;
	}
	formatPrice(price){
		return "$"+(price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}
	getCfg(self){
		if(self.$cookies.get('cfg')){
			const tmp=self.$cookies.get('cfg').substr(2);//la cookie viene definida como j:{}, para pasarlo por el JSON.parse() habrá que borrar esos dos caracteres que le sobran
			return JSON.parse(tmp);
		}else{
			window.location.replace('/login');
		}
	}
}
//original
export default CommonFns;

//para testing
// const commonFns=new CommonFns();
// module.exports = commonFns;

