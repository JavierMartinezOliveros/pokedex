import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPokemonList = () => api.get('pokemon?limit=151');
export const getPokemonDetails = (name: string) => api.get(`pokemon/${name}`);
