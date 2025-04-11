import type { IForecastList } from '@/types/types';

const apiKey = '9170e0e85794088df319259526c55afd';

export const getForecast = async (
  latitude: number,
  longitude: number,
): Promise<IForecastList | null> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const responseData = (await response.json()) as IForecastList;
    return responseData;
  } catch (error) {
    console.log('Error fetching forecast data', error);
    throw error;
  }
};
