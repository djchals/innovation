<template>
	<div>
		<div id="container-data">
			<h1>Starship list</h1>
			<table>
				<thead>
					<tr>
						<th><router-link v-bind:to="'/starship-list-name-'+arrAntiSort[sort]">Name {{((order=='name')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/starship-list-weight-'+arrAntiSort[sort]">Weight {{((order=='weight')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/starship-list-manufacturer-'+arrAntiSort[sort]">Manufacturer {{((order=='manufacturer')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/starship-list-yearConstruction-'+arrAntiSort[sort]">Year of construction {{((order=='yearConstruction')?arrArrow[sort]:'')}}</router-link></th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actS of arrStarship">
						<td>{{actS.name}}</td>
						<td>{{actS.weight}}</td>
						<td>{{actS.manufacturer}}</td>
						<td>{{actS.yearConstruction}}</td>
						<td><router-link :to="'/starship-profile-'+actS._id">View Starship</router-link></td>
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
		arrStarship: [],
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

			const response=await fetch('/starship-list',{
				method: 'post',
				body: JSON.stringify(body),
				headers:{
					'Content-Type':'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				this.arrStarship=data.arrStarship;
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
