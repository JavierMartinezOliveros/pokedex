<template>
  <div class="pokedex pokedex-home">
    <div class="pokedex-home-image">
      <img src="../../public/pikachu.svg" alt="pikachu" />
    </div>
    
    <div class="pokedex-home-content">
      <h1>Welcome to Pokédex</h1>
      <p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    </div>
    <Button
      usage="active"
      label="Get Started"
      @click="goToPokedex"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import  Button  from '../components/Button.vue'
export default defineComponent({
  name: 'Home',
  components: {
    Button,
  },
  setup() { 
    const router = useRouter();
  
    const goToPokedex = () => {
      router.push('/pokedex');
    };

    return { goToPokedex };
  }

});
</script>