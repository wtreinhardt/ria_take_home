<script setup lang="ts">
import ContentCard from './ContentCard.vue';
import type { IForecastList, IForecast } from '@/types/types';
import { computed, type PropType } from 'vue';

const props = defineProps({
  forecastList: Object as PropType<IForecastList | null>,
});

const dailyForecasts = computed(() => {
  return props.forecastList ? aggregateDailyForecasts(props.forecastList) : [];
});

interface IDailyForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  commonDescription: string;
  commonMain: string;
  commonIcon: string;
}

// Only want to show the day icon variant in 5-day forecast
const normalizeIcon = (icon: string): string => {
  return icon.slice(0, 2) + 'd';
};

const getMode = (arr: string[]): string => {
  const frequency: Record<string, number> = arr.reduce(
    (acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  let mode = '';
  let maxCount = 0;
  for (const key in frequency) {
    if (frequency[key] > maxCount) {
      mode = key;
      maxCount = frequency[key];
    }
  }
  return mode;
};

const aggregateDailyForecasts = (data: IForecastList): IDailyForecast[] => {
  const dailyMap = data.list.reduce(
    (acc, forecast) => {
      const adjustedDate = new Date((forecast.dt + data.city.timezone) * 1000);

      const year = adjustedDate.getUTCFullYear();
      const month = (adjustedDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = adjustedDate.getUTCDate().toString().padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(forecast);
      return acc;
    },
    {} as Record<string, IForecast[]>,
  );

  return Object.keys(dailyMap)
    .sort()
    .slice(0, 5)
    .map((dateKey) => {
      const forecasts = dailyMap[dateKey];
      const highTemp = Math.round(Math.max(...forecasts.map((f) => f.main.temp_max)));
      const lowTemp = Math.round(Math.min(...forecasts.map((f) => f.main.temp_min)));
      const icons = forecasts.map((f) => normalizeIcon(f.weather[0].icon));
      const mains = forecasts.map((f) => f.weather[0].main);
      const descriptions = forecasts.map((f) => f.weather[0].description);

      const commonIcon = getMode(icons);
      const commonMain = getMode(mains);
      const commonDescription = getMode(descriptions);

      const [year, month, day] = dateKey.split('-').map(Number);
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      return {
        date: formattedDate,
        highTemp,
        lowTemp,
        commonDescription,
        commonMain,
        commonIcon,
      } as IDailyForecast;
    });
};
</script>

<template>
  <ContentCard>
    <h1>Next 5 days</h1>
    <div v-for="(day, index) in dailyForecasts" :key="index" class="forecast-container">
      <img
        :src="`https://openweathermap.org/img/wn/${day.commonIcon}@2x.png`"
        :alt="day.commonMain + ' icon'"
      />
      <div class="forecast-date">
        <p class="date">{{ day.date }}</p>
        <p class="description">{{ day.commonDescription }}</p>
      </div>
      <span class="temperature">{{ day.highTemp }}&deg; {{ day.lowTemp }}&deg;</span>
    </div>
  </ContentCard>
</template>

<style scoped>
.forecast-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  img {
    max-width: 33%;
  }
}

.forecast-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;

  .date {
    font-weight: 600;
    font-size: 1.2rem;
  }

  .description {
    text-transform: capitalize;
  }
}

.temperature {
  font-weight: 600;
}
</style>
