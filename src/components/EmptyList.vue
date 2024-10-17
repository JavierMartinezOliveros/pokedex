<template>
  <div class="empty-list">
    <h1>Uh-oh</h1>

    <p>You look lost on your journey!</p>
    <Button
      usage="active"
      label="Go back home" 
      @click="goHome" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue';

export default defineComponent({
  name: 'EmptyList',
  components: { 
    Button
  },
  setup() {
    const router = useRouter();
    
    const goHome = () => {
      router.push({ name: 'Home' });
    };

    return { goHome };
  }
});
</script>

