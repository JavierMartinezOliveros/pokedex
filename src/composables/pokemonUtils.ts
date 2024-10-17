export const getPokemonImageUrl = (pokemonId: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
};

export const capitalizeFirstLetter = (name?: string): string => {
  return typeof name === 'string' && name.length > 0
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : '';
};
