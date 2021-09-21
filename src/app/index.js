import Vue from 'vue';
import router from '../routes/vueRoutes.js'
import Wrapper from "../components/Wrapper.vue";

new Vue({
	router,
	render: h => h(Wrapper)
}).$mount('#wrapper');
