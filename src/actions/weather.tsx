// import { SET_WEATHER_DATA } from './types'

// Add weather api
export const currentWeatherData = (data: any) => {
  return {
    type: 'SET_WEATHER_DATA',
    payload: data,
  }
}
