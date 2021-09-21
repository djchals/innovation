<template>
	<div class="section scrollspy">
		<div class="row">
			<div class="col s12">
				<router-view :key="updateKey" v-on:changedState="changedState"/>
			</div>
		</div>
	</div>
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

