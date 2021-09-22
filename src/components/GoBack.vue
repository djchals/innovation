<template>
	<p class="mt-5">
		<router-link :to="(profileType)?'/'+this.$route.params.profileType+'-list':'/'"><i class="material-icons">arrow_back</i></router-link>
	</p>
</template>
<script>
export default{
	props:{
		profileType: {
			type: String,
			default: ''
		}
	}
}
</script>
