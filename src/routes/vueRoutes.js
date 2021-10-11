import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);

import Home from "../components/Home.vue";

//Estos tres componentes son bastante parecidos pero los he dejado por separado porque posiblemente si fuera un proyecto real, serían más diferentes unos de otros e irían separados porque sería más follón si estuvieran agrupados en uno solo.
import PeopleList from "../components/PeopleList.vue";
import StarshipList from "../components/StarshipList.vue";
import PlanetList from "../components/PlanetList.vue";
//

import Profile from "../components/Profile.vue";
import ProfileEdit from "../components/ProfileEdit.vue";

const router = new Router({
	mode: "history",
	routes: [
		{path: "/",component: Home},
		{path: "/people-list",component: PeopleList, redirect: '/people-list-name-asc'},
		{path: "/people-list-:order(name|age|height|eyeColor)-:sort(asc|dsc)", component: PeopleList},
						  
		{path: "/starship-list",component: StarshipList, redirect: '/starship-list-name-asc'},
		{path: "/starship-list-:order(name|weight|manufacturer|yearConstruction)-:sort(asc|dsc)", component: StarshipList},

		{path: "/planet-list",component: PlanetList, redirect: '/planet-list-name-asc'},
		{path: "/planet-list-:order(name|weight|diameter|numSatelites)-:sort(asc|dsc)", component: PlanetList},
		
		{path: "/:profileType(planet|starship|people)-profile-:profileId([0-9]*)", component: Profile},
		{path: "/:profileType(planet|starship|people)-profile-edit-:profileId([0-9]*)", component: ProfileEdit},
	]
});
export default router
