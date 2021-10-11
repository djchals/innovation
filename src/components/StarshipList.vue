<template>
	<div>
		<div id="container-data" class="col s6">
			<div class="collection">
				<h4 class="center">Starship list</h4>
				<table class="mb-5">
					<thead>
						<tr>
							<th class="center"><router-link v-bind:to="'/starship-list-name-'+arrAntiSort[sort]">Name <i v-if="order=='name'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center"><router-link v-bind:to="'/starship-list-weight-'+arrAntiSort[sort]">Weight <i v-if="order=='weight'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center"><router-link v-bind:to="'/starship-list-manufacturer-'+arrAntiSort[sort]">Manufacturer <i v-if="order=='manufacturer'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center"><router-link v-bind:to="'/starship-list-yearConstruction-'+arrAntiSort[sort]">Year of construction <i v-if="order=='yearConstruction'" class="material-icons">{{arrArrow[sort]}}</i></router-link></th>
							<th class="center">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="actS of arrStarship">
							<td class="center">{{actS.name}}</td>
							<td class="center">{{actS.weight}}kg</td>
							<td class="center">{{actS.manufacturer}}</td>
							<td class="center">{{actS.yearConstruction}}</td>
							<td class="center"><router-link :to="'/starship-profile-'+actS.id">View Starship</router-link></td>
						</tr>
					</tbody>
				</table>
			</div>
			<GoBack/>
		</div>
		<Loading/>
	</div>
</template>
<script>
import CommonFns from './js/CommonFns.js';
import Loading from './Loading.vue';
import GoBack from './GoBack.vue';
export default {
	components: {GoBack,Loading},
	data:()=>({
		commonFns: new CommonFns(),
		arrStarship: [],
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
