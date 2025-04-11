export interface IForecastList {
  cod: string;
  message: number;
  cnt: number;
  list: IForecast[];
  city: ICityData;
}

export interface IForecast {
  dt: number;
  main: ITemperatureData;
  weather: IWeatherData[];
  clouds: Object;
  wind: Object;
  visibility: number;
  pop: number;
  sys: Object;
  dt_txt: string;
}

export interface ITemperatureData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface IWeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ICityData {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ICityTabData {
  name: string;
  lat: number;
  lon: number;
  isActive: boolean;
}
