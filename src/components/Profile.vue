<template>
	<div>
		<div id="container-data">
			<div class="row">
				<div class="col s12 m6">
					<div class="card">
						<div class="card-content">
							<h4 class="center">{{arrTagProfileType[this.$route.params.profileType]}} data</h4>
							<ul>
								<li><b>ID</b>: {{this.$route.params.profileId}}</li>
								<li><b>Name</b>: {{profile.name}}</li>
								<template v-if="this.$route.params.profileType=='people'">
									<li><b>Age</b>: {{profile.age}}years old</li>
									<li><b>Height</b>: {{profile.height}}cm</li>
									<li><b>Eye Color</b>: {{profile.eyeColor}}</li>
								</template>
								<template v-else-if="this.$route.params.profileType=='starship'">
									<li><b>Weight</b>: {{profile.weight}}kg</li>
									<li><b>Manufacturer</b>: {{profile.manufacturer}}</li>
									<li><b>Year Construction</b>: {{profile.yearConstruction}}</li>
								</template>
								<template v-else-if="this.$route.params.profileType=='planet'">
									<li><b>Weight</b>: {{profile.weight}}kg</li>
									<li><b>Diameter</b>: {{profile.diameter}}km</li>
									<li><b>Num. Satelites</b>: {{profile.numSatelites}}</li>
								</template>	
							</ul>
						</div>
					</div>
				</div>
			</div>
			<p class="mt-5">
				<router-link :to="'/'+this.$route.params.profileType+'-list'"><i class="material-icons">arrow_back</i></router-link>
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
		profile: {},
		arrTagProfileType: {
			people: "Personal",
			starship: "Starship",
			planet: "Planet"
		},
		profile: {}
	}),methods: {
		async getProfile(){
			this.commonFns.toggleContent('loading');
			const body={
				profileType: this.$route.params.profileType,
				profileId: this.$route.params.profileId
			};
			const response=await fetch('/get-profile',{
				method: 'post',
				body: JSON.stringify(body),
				headers:{
					'Content-Type':'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				if(data.profile){
					this.profile=data.profile;
				}
				this.commonFns.toggleContent('ready');
			});
		}
	},
	//HOOKS
	mounted() {
		this.getProfile();
	}
}
</script>
