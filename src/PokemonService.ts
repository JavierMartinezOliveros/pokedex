import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const getPokemonList = () => api.get('pokemon?limit=151');
export const getPokemonDetails = (name: string) => api.get(`pokemon/${name}`);