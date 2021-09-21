//common functions for vue
class CommonFns {
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
}
export default CommonFns;
