import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit

import './sass/main.scss'
import WeatherApp from './Components/Weather.tsx'
import CurrentWeather from './Components/CurrentWeather'
import reportWebVitals from './reportWebVitals'

import rootReducer from './reducers/weather'
const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className='container'>
        <CurrentWeather />
        <WeatherApp />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
