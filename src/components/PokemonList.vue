<template>
    <div>
        <b-row class="m-4">
            <b-col sm="12" md="3" v-for="pokemon in pokemons" :key="pokemon.name" >
                <b-card
                    :title= "pokemon.title"
                    :img-src="pokemon.imgUrl"
                    img-alt="Image"
                    img-bottom
                    tag="article"
                    style=""
                    class="mb-4"
                    bg-variant="dark" 
                    text-variant="white"
                >
                </b-card>
            </b-col>
        </b-row>
        <b-row class="m-4 text-center" v-if="this.isLoading">
            <Loading />
        </b-row>
        <b-row class="m-4 text-center"> 
            <b-col sm="12">
                <b-button variant="success" @click="getPokemons()">Load More</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Loading from './Loading.vue'
Vue.use(VueAxios, axios) 

export default {
    components: { Loading },
    name: "PokemonList",
    data(){
        return {
            apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
            next: '',
            pokemons: [],
            isLoading: false
        }
    },
    mounted(){
        this.getPokemons()
    },
    methods: {
        jsUcfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getpokemonId(url){
            let replaceUrl = url.replace(/\/$/, '')
            return replaceUrl.substring(replaceUrl.lastIndexOf('/') + 1)            
        },
        getPokemons() {
            this.isLoading = true
            Vue.axios.get(this.next === "" ? this.apiUrl : this.next)
                .then(resp=> {                           
                    this.next = resp.data.next    
                    console.log(this.next)      
                    resp.data.results.forEach((value) => {  
                        let pokemonId = this.getpokemonId(value.url) 
                        let imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemonId+".png"
                        let title = "#" + pokemonId + " " + this.jsUcfirst(value.name)
                        this.pokemons.push( {pokemonid: pokemonId, name:value.name, title:title, url: value.url, imgUrl: imgUrl} )
                    });    
                    this.isLoading= false                
                })
        },
    }
}
</script>