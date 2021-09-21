import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);

import Home from "../components/Home.vue";
import PeopleList from "../components/PeopleList.vue";
import StarshipList from "../components/StarshipList.vue";
import PlanetList from "../components/PlanetList.vue";

import Profile from "../components/Profile.vue";

const router = new Router({
	mode: "history",
	routes: [
		{path: "/",component: Home},
		{path: "/people-list",component: PeopleList, redirect: '/people-list-name-asc'},
		{path: "/people-list-:order(name|age|height|eyeColor)-:sort(asc|dsc)", component: PeopleList},
						  
		{path: "/starship-list",component: StarshipList, redirect: '/starship-list-name-asc'},
		{path: "/starship-list-:order(name|weight|diameter|numSatelites)-:sort(asc|dsc)", component: StarshipList},

		{path: "/planet-list",component: PlanetList, redirect: '/planet-list-name-asc'},
		{path: "/planet-list-:order(name|weight|diameter|numSatelites)-:sort(asc|dsc)", component: PlanetList},
		
		{path: "/:profileType(planet|starship|people)-profile-:profileId([0-9a-f]{24})", component: Profile},
	]
});
export default router
