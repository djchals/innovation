<template>
	<div>
		<div id="container-data">
			<h1>Home</h1>
			<h2><router-link to="/people-list">People</router-link></h2>
			<h2><router-link to="/starship-list-name-asc">Starships</router-link></h2>
			<h2><router-link to="/planet-list">Planets</router-link></h2>
		</div>
		<Loading/>
	</div>
</template>
<script>
import CommonFns from './js/CommonFns.js';
import Loading from './Loading.vue';
export default {
	components: {Loading},
	data:()=>({
		commonFns: new CommonFns(),
	
	}),
	mounted(){
		this.commonFns.toggleContent('ready');
	}
}
</script>
