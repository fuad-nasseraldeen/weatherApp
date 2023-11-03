import { WeatherData } from '../Components/types.tsx';
import * as utils from '../Layouts/Utils.tsx';
import _ from 'lodash';

async function FetchRemoteWeatherComponent() {
  const localCoords: GeolocationCoordinates = await utils.getUserPosition();
  let w_data: WeatherData = {
    weather: [],
    name: '',
    sys: {
      country: '',
      sunset: 0,
      sunrise: 0,
    },
    main: null,
    rain: null,
    snow: null,
    clouds: null,
    wind: null,
    visibility: '',
  };

  let w_data_arr: WeatherData[] = [w_data, w_data];

  // Define variables for making a Cross-Origin request
  let dataURL = new URL(
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    localCoords.latitude +
    '&lon=' +
    localCoords.longitude +
    '&units=metric' +
    utils.key_num
  );

  let headersObj = new Headers();
  headersObj.append('Accept', 'application/json');

  let userMetricRequest = new Request(dataURL, {
    method: 'GET',
    headers: headersObj,
    mode: 'cors',
  });

  try {
    let response = await fetch(userMetricRequest);
    w_data_arr[1] = await response.json();

    if (w_data_arr[0] && 'weather' in w_data_arr[0] && !_.isEmpty(w_data_arr[0].weather)) {
      w_data = Object.assign({}, w_data_arr[0]);
      return w_data_arr[0]
    }
    return w_data_arr[1]
  } catch (error) {
    console.log('ERROR', error);
  }
};

export default FetchRemoteWeatherComponent;
