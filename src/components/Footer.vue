<template>
  <footer>
    <div class="pokedex-wrapper">
      <Button 
        usage="active"
        label="All"
        @click="goToPokemonList"
      >
        <template #icon>
          <img class="icon" src="/IconMenu.svg" />
        </template>
      </Button>

      <Button 
        usage="disable"
        label="Favorites"
        @click="goToFavorites"
      >
        <template #icon>
          <img class="icon" src="/IconStarWhite.svg" />
        </template>
      </Button>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePokemonStore } from '../store/pokemonStore'; // Importar la tienda de Pokémon
import Button from './Button.vue';

export default defineComponent({
  name: 'Footer',
  components: {
    Button,
  },
  setup(_, { emit }) {
    const pokemonStore = usePokemonStore(); // Usar la tienda de Pokémon
    const favorites = pokemonStore.getFavorites; // Obtener la lista de favoritos

    const goToPokemonList = () => {
      emit('clearSearch');
      // Lógica para mostrar el listado de Pokémon
    };

    const goToFavorites = () => {
      console.log(favorites); // Mostrar los favoritos
    };

    return { goToPokemonList, goToFavorites, favorites };
  },
});
</script>

