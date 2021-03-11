<template>
    <b-navbar type="dark" variant="dark">
        <!--<b-navbar-nav class="ml-auto">-->
        <b-nav-form @submit="search" method="post" right>
            <b-navbar-brand :to="{ name: 'Home'}">Pokedex</b-navbar-brand>
            <b-form-input 
                class="mr-sm-2" 
                v-model="form.pokemonName"
                placeholder="Pokemon Name">
            </b-form-input>
            <b-form-select 
                class="mr-sm-2"
                v-model="form.gender"
                :options="genders"                
            ></b-form-select>
            <b-form-select 
                class="mr-sm-2"
                v-model="form.habitat"
                :options="habitats"                
            ></b-form-select>
            <b-form-select 
                class="mr-sm-2"
                v-model="form.region"
                :options="regions"                
            ></b-form-select>
            <b-button variant="success" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>     
        <!--</b-navbar-nav> -->
    </b-navbar>
</template>

<script>

import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios) 

export default {
    name: 'Navbar',
    data(){
        return {
        form: {
            pokemonName: '',
            gender: null,
            habitat: null,
            region: null,
            },
        apiUrl: "https://pokeapi.co/api/v2/",
        genders: [{ text: 'Genders', value: null }],
        habitats: [{ text: 'Habitats', value: null }],
        regions: [{ text: 'Regions', value: null }],
        }
    },
    components: {
    
    },
    mounted(){
        this.getGender()
        this.getHabitats()
        this.getRegions()
    },
    methods: {
        jsUcfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getGender() {
            Vue.axios.get(this.apiUrl + 'gender')
                .then(resp=> {
                    resp.data.results.forEach((value, key) => {
                        this.genders.push({ text: this.jsUcfirst(value.name), value:key + 1 })
                    });
                })
        },
        getHabitats() {
            Vue.axios.get(this.apiUrl + 'pokemon-habitat')
                .then(resp=> {
                    resp.data.results.forEach((value, key) => {
                        this.habitats.push({ text: this.jsUcfirst(value.name), value:key + 1 })
                    });
                })
        },
        getRegions() {
            Vue.axios.get(this.apiUrl + 'region/')
                .then(resp=> {
                    resp.data.results.forEach((value, key) => {
                        this.regions.push({ text: this.jsUcfirst(value.name), value:key + 1 })
                    });
                })
        },
        search(e){
            e.preventDefault(e)
            this.$emit('searchPokemon',this.form)
        }
  }
}
</script>