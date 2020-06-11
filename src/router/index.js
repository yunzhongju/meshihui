import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../state.js'
import Home from '../views/Home.vue'
import FoodShow from '../views/FoodShow.vue'
import Fitness from '../views/Fitness.vue'
import ProFile from '../views/ProFile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import Serach from '../views/Serach.vue'
import SerachList from '../views/SerachList.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/foodshow',
		name: 'FoodShow',
		component: FoodShow
	},
	{
		path: '/fitness',
		name: 'Fitness',
		component: Fitness
	},
	{
		path: '/profile',
		name: 'ProFile',
		component: ProFile,
		meta: {
			auth: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/detail/:id',
		name: 'Detail',
		component: Detail
	},
	{
		path: '/serach',
		name: 'Serach',
		component: Serach
	},
	{
		path: '/serachlist',
		name: 'SerachList',
		component: SerachList
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to,from,next)=>{
	if(to.meta.auth){
		if(store.getuser()){
			next()
		}else{
			next('/login')
		}
	}else{
		next()
	}
})
export default router
