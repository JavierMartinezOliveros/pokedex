<template>
  <div class="modal">
    <div class="modal-background">
      <div class="modal-content">
        <div 
          v-if="pokemon"
          class="modal-content-data"
        >
          <div class="modal-image">
            <img :src="getPokemonImageUrl(pokemon.id)" :alt="pokemon.name" />
          </div>
          
          <div class="modal-data">
            <p>Name: <span> {{ capitalizeFirstLetter(pokemon.name) }}</span></p>
            <p>Height: <span> {{ pokemon.height / 10 }}</span></p>
            <p>Weight: <span> {{ pokemon.weight / 10 }}</span></p>
            <p>Type: <span> {{ pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ') }}</span></p>
          </div>

          <div class="modal-footer">
            <Button 
              usage="active"
              label="Share to my friends"
              @click="share"
            />
            <button
              @click="addToFavorites"
            >
              <div 
                :class="['pokedex-fav-icon', { 'favorite': isFavorite }]" 
              >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z"/>
              </svg>
              </div>
            </button>
          </div>

          <button 
            class="modal-close"
            @click="$emit('close')"
          >
            <img src="/IconClose.png" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';
import { ref, onMounted } from 'vue';
import { getPokemonDetails } from '../PokemonService';
import { getPokemonImageUrl, capitalizeFirstLetter } from '../composables/pokemonUtils';
import Button from './Button.vue';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export default defineComponent({
  name: 'PokemonModal',
  components: {
    Button,
  },
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const pokemonStore = usePokemonStore();
    const pokemon = ref<Pokemon | null>(null);
    const loading = ref(true);
    const error = ref(false);
    const isFavorite = ref(false);

    onMounted(async () => {
      try {
        const response = await getPokemonDetails(props.pokemonName);
        pokemon.value = response.data;

        if (pokemon.value) {
          isFavorite.value = pokemonStore.isFavorite(pokemon.value.id);
        }
      } catch {
        error.value = true;
      } finally {
        loading.value = false;
      }
    });

    const addToFavorites = () => {
      if (pokemon.value) {
        if (isFavorite.value) {
          pokemonStore.removeFavorite(pokemon.value.id);
        } else {
          pokemonStore.addFavorite(pokemon.value);
        }
        isFavorite.value = !isFavorite.value;
        console.log('Updated isFavorite:', isFavorite.value);
      }
    };

    const share = () => {
      if (pokemon.value) {
        const pokemonInfo = `
          Name: ${capitalizeFirstLetter(pokemon.value.name)},
          Height: ${pokemon.value.height / 10},
          Weight: ${pokemon.value.weight / 10},
          Type: ${pokemon.value.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}
        `;
        
        navigator.clipboard.writeText(pokemonInfo)
          .then(() => {
            alert('Pokemon info copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      }
    };

    return { 
      pokemon, 
      loading, 
      error, 
      addToFavorites,
      isFavorite,
      getPokemonImageUrl, 
      share, 
      capitalizeFirstLetter 
    };
  },
});
</script>
