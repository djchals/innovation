<template>
	<div>
		<div id="container-data">
			<h1>People list</h1>
			<table>
				<thead>
					<tr>
						<th><router-link v-bind:to="'/people-list-name-'+arrAntiSort[sort]">Name {{((order=='name')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/people-list-age-'+arrAntiSort[sort]">Age {{((order=='age')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/people-list-height-'+arrAntiSort[sort]">Height {{((order=='height')?arrArrow[sort]:'')}}</router-link></th>
						<th><router-link v-bind:to="'/people-list-eyeColor-'+arrAntiSort[sort]">Eye color {{((order=='eyeColor')?arrArrow[sort]:'')}}</router-link></th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actP of arrPeople">
						<td>{{actP.name}}</td>
						<td>{{actP.age}}</td>
						<td>{{actP.height}}</td>
						<td>{{actP.eyeColor}}</td>
						<td><router-link :to="'/people-profile-'+actP._id">View Profile</router-link></td>
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
		arrPeople: [],
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
			await fetch('/people-list',{
				method: 'post',
				body: JSON.stringify(body),
				headers:{
					'Content-Type':'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				this.arrPeople=data.arrPeople;
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
