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
      if (!this.isFavorite(pokemon.name)) {
        this.favorites.push(pokemon);
      }
    },
    removeFavorite(pokemonName: string) {
      this.favorites = this.favorites.filter((pokemon: Pokemon) => pokemon.name !== pokemonName);
    },
    isFavorite(pokemonName: string): boolean {
      return this.favorites.some((pokemon: Pokemon) => pokemon.name === pokemonName);
    }
  },
});
