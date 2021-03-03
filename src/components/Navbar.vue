<template>
    <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">Pokedex</b-navbar-brand>
        <b-nav-form>
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
            Vue.axios.get('https://pokeapi.co/api/v2/gender')
                .then(resp=> {
                    resp.data.results.forEach((value, key) => {
                        this.genders.push({ text: this.jsUcfirst(value.name), value:key + 1 })
                    });
                })
        },
        getHabitats() {
            Vue.axios.get('https://pokeapi.co/api/v2/pokemon-habitat')
                .then(resp=> {
                    resp.data.results.forEach((value, key) => {
                        this.habitats.push({ text: this.jsUcfirst(value.name), value:key + 1 })
                    });
                })
        },
        getRegions() {
            Vue.axios.get('https://pokeapi.co/api/v2/region/')
                .then(resp=> {
                    resp.data.results.forEach((value, key) => {
                        this.regions.push({ text: this.jsUcfirst(value.name), value:key + 1 })
                    });
                })
        }
  }
}
</script>