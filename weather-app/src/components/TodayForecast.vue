<script setup lang="ts">
import type { PropType } from 'vue';
import ContentCard from './ContentCard.vue';
import type { IForecastList } from '../types/types';

const props = defineProps({
  forecastList: Object as PropType<IForecastList | null>,
});

const timeDisplay = (dt: number): string => {
  if (props.forecastList) {
    const adjustedDate = new Date(dt * 1000 + props.forecastList.city.timezone * 1000);

    return adjustedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  }
  return '';
};
</script>

<template>
  <ContentCard>
    <h1>Next hours</h1>
    <div class="forecast-container">
      <div
        v-for="(forecast, index) in forecastList?.list.splice(0, 4)"
        :key="index"
        class="forecast-tile"
      >
        <p class="degrees">{{ Math.round(forecast.main.temp) }}&deg;</p>
        <p class="humidity">{{ forecast.main.humidity }}%</p>
        <img
          :src="`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`"
          :alt="forecast.weather[0].main + ' icon'"
        />
        <p>{{ timeDisplay(forecast.dt) }}</p>
      </div>
    </div>
  </ContentCard>
</template>

<style scoped>
.forecast-container {
  display: flex;
}

.forecast-tile {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;

  &:not(:last-child)::after {
    position: absolute;
    content: '';
    border-inline-end: 1px solid #ddd;
    inset-block: 20%;
    inset-inline-end: 0;
  }

  img {
    max-width: 100%;
  }

  .humidity {
    color: #49f;
  }

  .degrees {
    font-weight: 600;
  }
}
</style>
