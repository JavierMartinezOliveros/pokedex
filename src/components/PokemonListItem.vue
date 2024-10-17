<template>
  <div class="pokedex-item">
    <div 
      v-for="pokemon in pokemonList" 
      :key="pokemon.id"
      @click="openModal(pokemon.name)"
      :class="['pokedex-item-data', { 'favorite': isFavorite(pokemon.name) }]"
    >
      {{ capitalizeFirstLetter(pokemon.name) }}
      <div class="pokedex-fav-icon">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z"/>
        </svg>
      </div>
    </div>
    <PokemonModal 
      v-if="showModal" 
      :pokemonName="selectedPokemon" 
      @close="showModal = false" 
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import PokemonModal from './PokemonModal.vue';
import { capitalizeFirstLetter } from '../composables/pokemonUtils';
import { usePokemonStore } from '../store/pokemonStore';

export default {
  props: {
    pokemonList: {
      type: Array as () => Array<{ name: string; id: number }>,
      required: true
    },
  },

  components: { PokemonModal },
  setup() {
    const showModal = ref(false);
    const selectedPokemon = ref('');
    const pokemonStore = usePokemonStore();

    const openModal = (name: string) => {
      selectedPokemon.value = name;
      showModal.value = true;
    };

    const isFavorite = (pokemonName: string) => {
      return pokemonStore.isFavorite(pokemonName);
    };

    return { 
      showModal, 
      selectedPokemon, 
      openModal, 
      capitalizeFirstLetter,
      pokemonStore,
      isFavorite
    };
  }
};
</script>
