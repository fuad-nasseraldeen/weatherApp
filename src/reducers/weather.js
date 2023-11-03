import { SET_WEATHER_DATA } from '../actions/types'

const initialState = {
  currentWeatherData: [],
}

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        currentWeatherData: payload,
      }
    default:
      return state
  }
}

export default rootReducer
