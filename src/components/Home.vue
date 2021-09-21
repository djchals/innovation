<template>
	<div>
		<div id="container-data" class="col s6">
			<ul class="collection col s6">
				<li class="collection-header"><h4>Home Options</h4></li>
				<li class="collection-item"><router-link to="/people-list">People</router-link></li>
				<li class="collection-item"><router-link to="/starship-list-name-asc">Starships</router-link></v>
				<li class="collection-item"><router-link to="/planet-list">Planets</router-link></li>
			</ul>
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
