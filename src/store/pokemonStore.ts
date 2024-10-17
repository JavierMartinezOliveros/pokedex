import { defineStore } from 'pinia';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    favorites: [] as Pokemon[],
  }),
  actions: {
    addFavorite(pokemon: Pokemon) {
      this.favorites.push(pokemon);
      console.log('Added to favorites:', this.favorites);
    },
    removeFavorite(pokemonId: number) {
      this.favorites = this.favorites.filter((pokemon: Pokemon) => pokemon.id !== pokemonId);
      console.log('Removed from favorites:', this.favorites);
    },
    isFavorite(pokemonId: number): boolean {
      const isFav = this.favorites.some((pokemon: Pokemon) => pokemon.id === pokemonId);
      console.log('Is favorite:', isFav);
      return isFav;
    },
  },
});


/* export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    favorites: [] as Pokemon[],
  }),
  actions: {
    addFavorite(pokemon: Pokemon) {
      this.favorites.push(pokemon);
    },
    removeFavorite(pokemonId: number) {
      this.favorites = this.favorites.filter((pokemon: Pokemon) => pokemon.id !== pokemonId);
    },
    isFavorite(pokemonId: number): boolean {
      return this.favorites.some((pokemon: Pokemon) => pokemon.id === pokemonId);
    },
  },
}); */
