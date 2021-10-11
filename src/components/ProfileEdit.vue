<template>
	<div>
		<div id="container-data">
			<div class="row">
				<div class="col s12 m6">
					<div class="card">
						<div class="card-content">
						    <h4 class="center">Edit {{arrTagProfileType[this.$route.params.profileType]}} {{this.$route.params.profileId}}</h4>
						    <form @submit.prevent="chkData" action="/profile-edit" method="post" name="formEdit">
							    <div class="row">
								<div class="col s12 m12 l6">
								    <div class="input-field col s12">
									<input 
									    type="text"
									    name="name" 
									    id="name" 
									    required 
									    class="validate" 
									    maxlength="30"
									>
									<label for="name" class="active">Name</label>
								    </div>
								</div>
								<template v-if="this.$route.params.profileType=='people'">
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="age" 
											id="age" 
											required 
											class="validate" 
											maxlength="3"
										    >
										    <label for="age" class="active">Age</label>
									    </div>
								    </div>
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="height" 
											id="height" 
											required 
											class="validate" 
											maxlength="3"
										    >
										    <label for="height" class="active">Height</label>
									    </div>
								    </div>
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="eyeColor" 
											id="eyeColor" 
											required 
											class="validate" 
											maxlength="10"
										    >
										    <label for="eyeColor" class="active">EyeColor</label>
									    </div>
								    </div>
								</template>
								<template v-else-if="this.$route.params.profileType=='planet'">
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="weight" 
											id="weight" 
											required 
											class="validate" 
											maxlength="3"
										    >
										    <label for="weight" class="active">Weight</label>
									    </div>
								    </div>
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="diameter" 
											id="diameter" 
											required 
											class="validate" 
											maxlength="6"
										    >
										    <label for="diameter" class="active">Diameter</label>
									    </div>
								    </div>
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="numSatelites" 
											id="numSatelites" 
											required 
											class="validate" 
											maxlength="3"
										    >
										    <label for="numSatelites" class="active">Num. Saletiles</label>
									    </div>
								    </div>
								</template>	
								<template v-else-if="this.$route.params.profileType=='starship'">
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="height" 
											id="height" 
											required 
											class="validate" 
											maxlength="3"
										    >
										    <label for="height" class="active">Height</label>
									    </div>
								    </div>
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="manufacturer" 
											id="manufacturer" 
											required 
											class="validate" 
											maxlength="30"
										    >
										    <label for="manufacturer" class="active">Manufacturer</label>
									    </div>
								    </div>
								    <div class="col s12 m12 l6">
									    <div class="input-field col s12">
										    <input 
											type="text"
											name="yearConstruction" 
											id="yearConstruction" 
											required 
											class="validate" 
											maxlength="4"
										    >
										    <label for="yearConstruction" class="active">Year of Construction</label>
									    </div>
								    </div>
							    </template>
							    <div class="row">	    
								<div class="col s12">
								    <button class="right waves-effect waves-light btn-small mb-1" type="submit"><i class="material-icons right">arrow_forward</i>{{etSend}}</button>
								</div>
							    </div>
							</div>
						    </form>
						</div>
					</div>
				</div>
			</div>
			<GoBack profileType="'/'+this.$route.params.profileType+'-list'"/>
		</div>
		<Loading/>
	</div>
</template>
<script>
import CommonFns from './js/CommonFns.js';
import GoBack from './GoBack.vue';
import Loading from './Loading.vue';
export default {
	components: {GoBack,Loading},
	data:()=>({
		commonFns: new CommonFns(),
		profile: {},
		arrTagProfileType: {
			people: "Personal",
			starship: "Starship",
			planet: "Planet"
		},
		etSend: 'Enviar',
		profile: {}
	}),methods: {
		async getProfile(){
			this.commonFns.toggleContent('loading');
			const body={
				profileType: this.$route.params.profileType,
				profileId: this.$route.params.profileId
			};
			await fetch('/get-profile',{
				method: 'post',
				body: JSON.stringify(body),
				headers:{
					'Content-Type':'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
			    console.log("fuego al 1")
				if(data.profile){
					this.profile=data.profile;
				}
				document.formEdit.name.value=this.profile.name
				switch(this.$route.params.profileType){
				    case 'people':
					document.formEdit.age.value=this.profile.age
					document.formEdit.height.value=this.profile.height
					document.formEdit.eyeColor.value=this.profile.eyeColor
				    break;
				    case 'planet':
					document.formEdit.weight.value=this.profile.weight
					document.formEdit.diameter.value=this.profile.diameter
					document.formEdit.numSatelites.value=this.profile.numSatelites
				    break;
				    case 'starship':
					document.formEdit.weight.value=this.profile.weight
					document.formEdit.manufaturer.value=this.profile.manufacturer
					document.formEdit.yearConstruction.value=this.profile.yearConstruction
				    break;
				}


				this.commonFns.toggleContent('ready');
			});
		},
	    chkData() {
		let flag = true
		let body
		switch(this.$route.params.profileType){
		    case 'people':
			if (
			    document.formEdit.name.value == '' ||
			    document.formEdit.age.value == '' ||
			    document.formEdit.height.value == '' ||
			    document.formEdit.eyeColor.value == ''
			) {
			    flag = false
			    alert ('Debes rellenar todos los campos')
			}
			body={
			    name: document.formEdit.name.value,
			    age: document.formEdit.age.value,
			    height: document.formEdit.height.value,
			    eyeColor: document.formEdit.eyeColor.value
			}
			break
		    case 'planet':
			if (
			    document.formEdit.name.value == '' ||
			    document.formEdit.weight.value == '' ||
			    document.formEdit.diameter.value == '' ||
			    document.formEdit.numSatelites.value == ''
			) {
			    flag = false
			    alert ('Debes rellenar todos los campos')
			}
			body={
			    name: document.formEdit.name.value,
			    weight: document.formEdit.weight.value,
			    diameter: document.formEdit.diameter.value,
			    numSatelites: document.formEdit.numSatelites.value
			}

			break
		    case 'starship':
			if (
			    document.formEdit.name.value == '' ||
			    document.formEdit.weight.value == '' ||
			    document.formEdit.manufacturer.value == '' ||
			    document.formEdit.yearConstruction.value == ''
			) {
			    flag = false
			    alert ('Debes rellenar todos los campos')
			}
			body={
			    name: document.formEdit.name.value,
			    weight: document.formEdit.weight.value,
			    manufacturer: document.formEdit.manufacturer.value,
			    yearConstruction: document.formEdit.yearConstruction.value
			}

			break
		}
		if(flag) {
		    body.profileType = this.$route.params.profileType
		    body.profileId = this.$route.params.profileId
		    fetch('/profile-edit', {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
			    'Content-Type': 'application/json'
			} 
		    })
		    .then(res => res.json())
		    .then(data => {
			if(data.saved) {
			    this.$route.push('/'+this.$route.params.profileType+'-list')
			}
		    })
		}
	    }
	},
	//hooks
	mounted() {
		this.getProfile()
	}
}
    </script>
