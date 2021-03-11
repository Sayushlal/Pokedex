<template>
    <div v-if="detailDisplay">
		<Navbar v-on:searchPokemon="searchPokemon" />
        <b-card 
            bg-variant="dark" 
            text-variant="white"
            :header= this.jsUcfirst(this.pokemonDetail.name)
            header-tag = h2
            class="m-4 text-center"
        >
            <b-row class="text-left">
                <b-col md="4">
                    <b-card-img :src=this.imgLink alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="8">
                    <b-card-body title="Basic Information">
                        <b-card-text>
                            Height: {{this.pokemonDetail.height}}
                        </b-card-text>
                        <b-card-text>
                            Weight: {{this.pokemonDetail.weight}}
                        </b-card-text>
                        <b-card-text>
                            Base Experience: {{this.pokemonDetail.base_experience}}
                        </b-card-text>
                    </b-card-body>
                    <b-card-body title="Types and Abilities">
                        <b-card-text>
                            Types: 
                            <span v-for="type in this.pokemonDetail.types" :key="type.type.name">
                                <b-badge variant="primary" class="ml-2">
                                    {{ type.type.name }}
                                </b-badge>
                            </span>
                        </b-card-text>
                        <b-card-text>
                            Abilities 
                            <span v-for="abi in this.pokemonDetail.abilities" :key="abi.ability.name">
                                <b-badge variant="primary" class="ml-2">
                                    {{ abi.ability.name }}
                                </b-badge>
                            </span>
                        </b-card-text>
                    </b-card-body>
                    <b-card-body title="Stats">
                        <b-card-text v-for="stat in this.pokemonDetail.stats" :key="stat.stat.name">
                            {{ stat.stat.name }}
                            <b-progress :value="stat.base_stat" show-progress max="255" class="mb-3" variant= "danger"></b-progress>
                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
        <Loading v-if="isLoading" />
    </div>
</template>
<script>
import Navbar from './Navbar'
import Loading from './Loading'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios) 

export default {
    name: 'Pokemon',
    data(){
        return{
            pokemonId: this.$route.params.pokemonId,
            apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
            pokemonDetail: [],
            isLoading: false,
            detailDisplay: false,
            imgLink: '',
        }
    },
    components: {
        Navbar,
        Loading    
    },
    mounted(){
        this.getPokemonDetail()
    },
    methods: {
        searchPokemon(){
            this.$emit('searchPokemon',this.form)
        },
        jsUcfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }, 
        getPokemonDetail() {
            this.isLoading = true
            this.detailDisplay = false
                Vue.axios.get(this.apiUrl + this.pokemonId)
                    .then(resp=> { 
                        this.pokemonDetail = resp.data 
                        this.isLoading = false 
                        this.detailDisplay = true
                        this.imgLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+this.pokemonId+'.png'                            
                    })
            },
    }
}
</script>