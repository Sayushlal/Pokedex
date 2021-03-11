import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Pokemon from './components/Pokemon'
Vue.use(VueRouter)
const routes = [
    {path:'/', component:Home, name: 'Home'},
    {path:'/pokemon/:pokemonId', component:Pokemon, name: 'Pokemon'}
]
const router = new VueRouter({
    routes
})
Vue.config.productionTip = false

new Vue({
    router:router,
    render: h => h(App),
}).$mount('#app')
