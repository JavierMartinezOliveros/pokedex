<template>
  <footer>
    <div class="pokedex-wrapper">
      <Button 
        :usage="isFavoritesView ? 'disable' : 'active'"
        label="All"
        @click="getPokemonList"
      >
        <template #icon>
          <img class="icon" src="/IconMenu.svg" />
        </template>
      </Button>

      <Button 
        :usage="isFavoritesView ? 'active' : 'disable'"
        label="Favorites"
        @click="getFavorites"
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
import { usePokemonStore } from '../store/pokemonStore';
import Button from './Button.vue';

export default defineComponent({
  name: 'Footer',
  components: {
    Button,
  },
  props: {
    isFavoritesView: {
      type: Boolean,
      required: true
    }
  },
  setup(_, { emit }) {
    const pokemonStore = usePokemonStore(); 
    const favorites = pokemonStore.getFavorites;

    const getPokemonList = () => {
      emit('clearSearch');
      emit('toggleView');
      if (!_.isFavoritesView) {
      }
    };

    const getFavorites = () => {
      emit('clearSearch');
      if (_.isFavoritesView) return;
      emit('toggleView', true);
    };

    return { 
      getPokemonList, 
      getFavorites, 
      favorites 
    };
  },
});
</script>

