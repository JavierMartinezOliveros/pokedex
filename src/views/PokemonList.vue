<template>
  <div class="pokedex-wrapper">

    <input 
      v-if="!loading"
      v-model="search"
      id="search"
      class="pokedex-field" 
      placeholder="Search" 
    />
    
    <div 
      v-if="loading"
      class="loader"
    />
    
    <EmptyList v-if="error" />

    <PokemonListItem 
      v-if="pokemonList.length > 0" 
      :pokemonList="filteredPokemonList" 
    />
    <Footer 
      v-if="!error && !loading" 
      @clearSearch="clearSearchField" 
      :isFavoritesView="isFavoritesView"
      @toggleView="toggleView"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getPokemonList } from '../PokemonService';
import { usePokemonStore } from '../store/pokemonStore';
import type { Pokemon } from '../store/pokemonStore';
import PokemonListItem from '../components/PokemonListItem.vue';
import Footer from '../components/Footer.vue';
import EmptyList from '../components/EmptyList.vue';

export default {
  components: { 
    PokemonListItem, 
    EmptyList,
    Footer
  },
  setup() {
    const pokemonStore = usePokemonStore();
    const pokemonList = ref<Pokemon[]>([]);
    const loading = ref(true);
    const error = ref(false);
    const search = ref('');
    const isFavoritesView = ref(false);

    const clearSearchField = () => {
      search.value = '';
    };

    onMounted(async () => {
      try {
        // para simular un error en la api, se desconmenta esto y se comenta el response
        //throw new Error('Simulated API error'); 
        //simula una espera de 2 segundos para visualizar el loader
        //await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await getPokemonList();
        pokemonList.value = response.data.results;
      } catch {
        error.value = true;
      } finally {
        loading.value = false;
      }
    });

    const filteredPokemonList = computed(() => {
      const currentList = isFavoritesView.value 
        ? pokemonStore.favorites || [] 
        : pokemonList.value;

      return currentList.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const toggleView = (showFavorites: boolean) => {
      isFavoritesView.value = showFavorites;
    };

    return { 
      pokemonList, 
      loading, 
      error, 
      search, 
      filteredPokemonList,
      clearSearchField,
      pokemonStore,
      toggleView,
      isFavoritesView
    };
  }
};
</script>
