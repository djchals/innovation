<template>
	<router-view :key="updateKey" v-on:changedState="changedState"/>
</template>
<script>
export default {
	name: 'Wrapper',
	data:()=>({
		updateKey: 0
	}),
	methods:{
		changedState(event){
			this.updateKey++;
		}
	}
} 
</script>

