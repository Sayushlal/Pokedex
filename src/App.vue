<template>
	<div id="app">
		<Navbar />
        <!--<b-container class="mt-4">-->
            <PokemonList />
        <!--</b-container>-->
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import PokemonList from './components/PokemonList.vue'

export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components: {
    Navbar,
    PokemonList    
  }
}
</script>

<style>
</style>
