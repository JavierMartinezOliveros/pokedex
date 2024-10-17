import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PokemonList from './views/PokemonList.vue';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/pokedex', component: PokemonList, name: 'PokemonList' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
