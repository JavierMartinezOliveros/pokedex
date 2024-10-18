import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import PokemonListItem from '../components/PokemonListItem.vue';
import PokemonModal from '../components/PokemonModal.vue';

vi.mock('../store/pokemonStore', () => ({
  usePokemonStore: () => ({
    isFavorite: vi.fn((name) => name === 'bulbasaur'),
  }),
}));

describe('PokedexItem.vue', () => {
  const pokemonList = [
    { id: 1, name: 'bulbasaur' },
    { id: 2, name: 'ivysaur' },
  ];

  it('renders the pokemon list and opens modal on click', async () => {
    const wrapper = mount(PokemonListItem, {
      props: { pokemonList },
      global: {
        components: {
          PokemonModal,
        },
      },
    });

    expect(wrapper.text()).toContain('Bulbasaur');
    expect(wrapper.text()).toContain('Ivysaur');

    const bulbasaurItem = wrapper.find('.pokedex-item-data:nth-of-type(1)');
    expect(bulbasaurItem.classes()).toContain('favorite');

    await bulbasaurItem.trigger('click');

    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.findComponent(PokemonModal).exists()).toBe(true);
    expect(wrapper.findComponent(PokemonModal).props('pokemonName')).toBe('bulbasaur');

    await wrapper.findComponent(PokemonModal).vm.$emit('close');
    
    expect(wrapper.vm.showModal).toBe(false);
  });
});
