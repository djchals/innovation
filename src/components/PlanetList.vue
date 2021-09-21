<template>
	<div>
		<div id="container-data" class="col s6">
			<div class="collection">
				<h4 class="center">Planet list</h4>
				<table class="mb-5">
					<thead>
						<tr>
							<th class="center"><router-link v-bind:to="'/planet-list-name-'+arrAntiSort[sort]">Name <i v-if="order=='name'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center"><router-link v-bind:to="'/planet-list-weight-'+arrAntiSort[sort]">Weight <i v-if="order=='weight'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center"><router-link v-bind:to="'/planet-list-diameter-'+arrAntiSort[sort]">Diameter <i v-if="order=='diameter'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center"><router-link v-bind:to="'/planet-list-numSatelites-'+arrAntiSort[sort]">numSatelites <i v-if="order=='numSatelites'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="actP of arrPlanet">
							<td class="center">{{actP.name}}</td>
							<td class="center">{{actP.weight}}kg</td>
							<td class="center">{{actP.diameter}}km</td>
							<td class="center">{{actP.numSatelites}}</td>
							<td class="center"><router-link :to="'/planet-profile-'+actP._id">View Planet</router-link></td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="mt-5">
				<router-link to="/"><i class="material-icons">arrow_back</i></router-link>
			</p>
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
		arrPlanet: [],
		sort: '',
		order: '',
		lastOrder: '',
		lastSort: '',
		arrArrow: {
			asc: 'arrow_drop_up',
			dsc: 'arrow_drop_down'
		},
		arrAntiSort: {
			dsc: 'asc',
			asc: 'dsc'
		}
	}),methods: {
		async getList(){
			this.commonFns.toggleContent('loading');
			const body={
				order: this.order,
				sort: this.sort
			}
			
			this.lastOrder=body.order;
			this.lastSort=body.sort;

			const response=await fetch('/planet-list',{
				method: 'post',
				body: JSON.stringify(body),
				headers:{
					'Content-Type':'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				this.arrPlanet=data.arrPlanet;
				this.commonFns.toggleContent('ready');
			});
		},chkSortingVars(){
			this.order=this.$route.params.order;
			this.sort=this.$route.params.sort;
		}
	},
	//HOOKS
	mounted() {
		this.getList();
	},beforeRouteUpdate(to, from, next) {
		this.$forceUpdate();
		next();
	},
	updated(){
		this.chkSortingVars();
		if(!(
			this.lastOrder==this.order && 
			this.lastSort==this.sort
		)){
			this.getList();
		}
	}
}
</script>
