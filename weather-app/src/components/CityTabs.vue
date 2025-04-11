<script setup lang="ts">
import { type PropType } from 'vue';
import type { ICityTabData } from '../types/types.ts';

const props = defineProps({
  cities: { type: Object as PropType<Array<ICityTabData>> },
});

const emit = defineEmits(['tabClicked']);

const setActive = (index: number) => {
  emit('tabClicked', index);
};
</script>

<template>
  <div class="tab-container">
    <div
      v-for="(city, index) in cities"
      :key="city.name"
      class="city-tab"
      :class="{ active: city.isActive }"
      @click="setActive(index)"
    >
      {{ city.name }}
    </div>
  </div>
</template>

<style scoped>
.tab-container {
  position: sticky;
  inset-block-start: 0;
  z-index: 5;
  display: flex;
  background: #fff;
  overflow: auto;
}

.city-tab {
  text-transform: uppercase;
  padding: 1rem;
  color: #777;
  font-weight: 600;

  &.active {
    border-bottom: 2px solid #f50;
    color: #000;
  }

  cursor: pointer;
}
</style>
