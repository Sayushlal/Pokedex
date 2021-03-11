<template>
    <div>        
        <b-row class="m-4">
            <b-col sm="12" md="3" v-for="pokemon in displayPokemons" :key="pokemon.name" >
                <router-link :to="{ name: 'Pokemon', params: { pokemonId: pokemon.entry_number }}" class="cardLink">
                    <b-card
                        :title= "pokemon.title"
                        :img-src="pokemon.imgUrl"
                        img-alt="Image"
                        img-bottom
                        tag="article"
                        class="m-4"
                        text-variant="white"                        
                    >
                    </b-card>
                </router-link>
            </b-col>
        </b-row>       
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios) 

export default {
    name: "PokemonList",
    props: ['displayPokemons'],
}
</script>

<style scoped>
    .card{
        cursor: pointer;
        background-color: #343a40;
    }
    .cardLink {
        text-decoration: none;
    }
    .card:hover{
        box-shadow: 0 0 6px rgb(35 173 255);
        transform: scale(1.1,1.1);
        background-color: #008b8b;
    }
</style>