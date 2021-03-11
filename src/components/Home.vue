<template>
	<div>
		<Navbar v-on:searchPokemon="searchPokemon"/>
        <PokemonList :displayPokemons="displayPokemons" v-if="listDisplay" />
        <Loading v-if="isLoading" />
        <error v-if="errorMessage" />
	</div>
</template>

<script>
    import Loading from './Loading.vue'
    import Navbar from './Navbar.vue'
    import PokemonList from './PokemonList.vue'

    import Vue from 'vue'
    import VueAxios from 'vue-axios'
    import axios from 'axios'
    import Error from './Error.vue'
    Vue.use(VueAxios, axios) 

    export default {
        name: 'Home',
        data(){
            return {
                apiUrl: 'https://pokeapi.co/api/v2/pokedex/1/',
                imgFolder: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
                pokemons: [],
                displayPokemons: [],
                genderPokemons: [],
                habitatPokemons: [],
                listDisplay: false,
                isLoading: false,
                errorMessage: false,
                pokemonByRegionId: [
                                    { id: 1, lower_limit: 1, upper_limit: 151 },
                                    { id: 2, lower_limit: 152, upper_limit: 251 },
                                    { id: 3, lower_limit: 252, upper_limit: 386 },
                                    { id: 4, lower_limit: 387, upper_limit: 393 },
                                    { id: 5, lower_limit: 394, upper_limit: 649 },
                                    { id: 6, lower_limit: 650, upper_limit: 721 },
                                    { id: 7, lower_limit: 722, upper_limit: 809 },
                                    { id: 7, lower_limit: 810, upper_limit: 898 }
                                ],
                matched_region: {
                    upper_limit: '',
                    lower_limit: ''
                }
            }
        },
        components: {
            Navbar,
            PokemonList,
            Loading,
            Error    
        },
        mounted(){
            this.getAllPokemons()
        },
        methods: {
            jsUcfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },       
            getpokemonId(url){
                let replaceUrl = url.replace(/\/$/, '')
                return replaceUrl.substring(replaceUrl.lastIndexOf('/') + 1)            
            }, 
            getAllPokemons() {
                this.isLoading = true
                Vue.axios.get(this.apiUrl)
                    .then(resp=> {  
                        resp.data.pokemon_entries.forEach((value) => {   
                            let imgUrl = this.imgFolder +value.entry_number+".png"
                            let title = "#" + value.entry_number + " " + this.jsUcfirst(value.pokemon_species.name)
                            this.pokemons.push( { entry_number: value.entry_number, name:value.pokemon_species.name, title:title, imgUrl: imgUrl} )
                            this.isLoading= false 
                            this.listDisplay = true
                        });
                        this.displayPokemons = this.pokemons        
                    })
            },
            searchByRegion(searchData){
                this.pokemonByRegionId.forEach((item) => {
                    if (item.id === searchData.region) {
                        this.matched_region.upper_limit = item.upper_limit;
                        this.matched_region.lower_limit = item.lower_limit;
                    }
                });
                let currentPokemons = this.pokemons
                if(searchData.pokemonName !== ''){
                    currentPokemons = this.displayPokemons
                }
                this.displayPokemons = currentPokemons.filter(
                    pokemon => {
                        if(
                            pokemon.entry_number >= this.matched_region.lower_limit && 
                            pokemon.entry_number <= this.matched_region.upper_limit) {
                            return true
                        }
                        return false
                    }
                )
            },
            searchByGender(searchData) {
                let currentPokemons = this.pokemons
                if(searchData.pokemonName !== '' || searchData.region !== null){
                    currentPokemons = this.displayPokemons
                }
                Vue.axios.get('https://pokeapi.co/api/v2/gender/' + searchData.gender)
                .then(resp=> {
                    this.genderPokemons = resp.data.pokemon_species_details
                    this.displayPokemons = currentPokemons.filter(pokemon => {
                        if (this.genderPokemons.find(x => x.pokemon_species.name === pokemon.name) === undefined) {
                            return false;
                        }
                        return true;
                    });
                })
            },
            searchByhabitat(searchData) {
                let currentPokemons = this.pokemons
                if(searchData.pokemonName !== '' || searchData.region !== null || searchData.gender !== null){
                    currentPokemons = this.displayPokemons
                }
                Vue.axios.get('https://pokeapi.co/api/v2/pokemon-habitat/' + searchData.habitat)
                .then(resp=> {                        
                    this.habitatPokemons = resp.data.pokemon_species
                    this.displayPokemons = currentPokemons.filter(pokemon => {
                        if (this.habitatPokemons.find(x => x.name === pokemon.name) === undefined) {
                            return false;
                        }
                        return true;
                    });                                                 
                })
            },            
            searchPokemon(searchData){                
                this.isLoading = true  
                this.errorMessage = false  
                if(searchData.pokemonName === '' && 
                    searchData.region === null && 
                    searchData.gender === null  && 
                    searchData.habitat === null
                ){
                    this.displayPokemons = []
                }                
                
                // filter by pokemon name
                if(searchData.pokemonName !== ''){
                    let currentPokemons = this.pokemons
                    this.displayPokemons = currentPokemons.filter(
                        pokemon => pokemon.name === searchData.pokemonName
                    )
                }

                // filter by pokemon Region
                if(searchData.region !== null){
                    this.searchByRegion(searchData)                    
                }

                // serach by gender
                if(searchData.gender !== null){
                    this.searchByGender(searchData)                    
                }

                // serach by habitat
                if(searchData.habitat !== null){
                    this.searchByhabitat(searchData)                    
                }

                if(this.displayPokemons.length === 0){
                    this.errorMessage = true
                }
                
                this.isLoading = false
                this.listDisplay = true
            }            
        }
    }
</script>
