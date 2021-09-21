<template>
	<div>
		<div id="container-data">
			<h1>{{arrTagProfileType[this.$route.params.profileType]}} data:</h1>
				<ul>
					<li>ID: {{this.$route.params.profileId}}</li>
					<li>Name: {{profile.name}}</li>
					<template v-if="this.$route.params.profileType=='people'">
						<li>Age: {{profile.age}}</li>
						<li>Height: {{profile.height}}</li>
						<li>Eye Color: {{profile.eyeColor}}</li>
					</template>
					<template v-else-if="this.$route.params.profileType=='starship'">
						<li>Weight: {{profile.weight}}</li>
						<li>Manufacturer: {{profile.manufacturer}}</li>
						<li>Year Construction: {{profile.yearConstruction}}</li>
					</template>
					<template v-else-if="this.$route.params.profileType=='planet'">
						<li>Weight: {{profile.weight}}</li>
						<li>Diameter: {{profile.diameter}}</li>
						<li>Num. Satelites: {{profile.numSatelites}}</li>
					</template>	
				</ul>
			<router-link :to="'/'+this.$route.params.profileType+'-list'">Go back</router-link>
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
