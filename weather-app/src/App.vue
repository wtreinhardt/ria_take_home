<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import CityTabs from './components/CityTabs.vue';
import TodayForecast from './components/TodayForecast.vue';
import FiveDayForcast from './components/FiveDayForcast.vue';
import LastUpdated from './components/LastUpdated.vue';
import { getForecast } from './services/weather-service.ts';
import type { IForecastList } from './types/types.ts';
import type { ICityTabData } from './types/types.ts';

const tabCities = ref<Array<ICityTabData>>([
  { name: 'Rio de Janeiro', lat: -22.9110137, lon: -43.2093727, isActive: true },
  { name: 'Beijing', lat: 39.906217, lon: 116.3912757, isActive: false },
  { name: 'Los Angeles', lat: 34.0536909, lon: -118.242766, isActive: false },
]);

const forecast: Ref<IForecastList | null> = ref<IForecastList | null>(null);
const lastUpdated: Ref<Date> = ref(new Date());
const hasError = ref(false);

onMounted(() => {
  // Get the first tab's forecast by default on load
  getForecastData(tabCities.value[0].lat, tabCities.value[0].lon);
});

const getForecastData = (lat: number, lon: number) => {
  getForecast(lat, lon)
    .then((data: IForecastList | null) => {
      forecast.value = data;
      lastUpdated.value = new Date();
      hasError.value = false;
    })
    .catch(() => {
      hasError.value = true;
    });
};

const setActiveTab = (index: number) => {
  tabCities.value.forEach((city, i) => {
    city.isActive = i === index;
  });
  getForecastData(tabCities.value[index].lat, tabCities.value[index].lon);
};
</script>

<template>
  <header>Simple Weather</header>

  <main>
    <CityTabs :cities="tabCities" @tab-clicked="setActiveTab" />
    <template v-if="hasError">
      <div class="error">
        <h1>Error</h1>
        <p>Unable to fetch weather forecast data.</p>
      </div>
    </template>
    <template v-else>
      <TodayForecast :forecast-list="forecast" />
      <FiveDayForcast :forecast-list="forecast" />
      <LastUpdated :last-updated="lastUpdated" />
    </template>
  </main>
</template>

<style scoped>
header {
  position: sticky;
  background: #37c;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
  z-index: 10;
  box-shadow: rgb(170, 170, 170) 0px 4px 2px -2px;
}

.error {
  background: #fff;
  color: #900;
  padding: 1rem;
}
</style>
