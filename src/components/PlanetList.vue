<template>
	<div>
		<div id="container-data">
			<h1>Planet list</h1>
			<table>
				<thead>
					<tr>
						<th><router-link v-bind:to="'/planet-list-name-'+arrAntiSort[sort]">Name {{((order=='name')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/planet-list-weight-'+arrAntiSort[sort]">Weight {{((order=='weight')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/planet-list-diameter-'+arrAntiSort[sort]">Diameter {{((order=='diameter')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/planet-list-numSatelites-'+arrAntiSort[sort]">numSatelites {{((order=='numSatelites')?arrArrow[sort]:'')}}</router-link></th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actP of arrPlanet">
						<td>{{actP.name}}</td>
						<td>{{actP.weight}}</td>
						<td>{{actP.diameter}}</td>
						<td>{{actP.numSatelites}}</td>
						<td><router-link :to="'/planet-profile-'+actP._id">View Planet</router-link></td>
					</tr>
				</tbody>
			</table>
			<router-link to="/">Go back</router-link>
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
			asc: '(up)',
			dsc: '(down)'
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
