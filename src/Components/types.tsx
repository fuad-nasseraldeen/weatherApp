export interface Weather {
  icon: string;
  description: string;
  main: string;
  id: number;
  // Add other properties as needed
}

// Define a type for 'w_data'
export interface WeatherData {
  main: any;
  rain: any;
  snow: any;
  clouds: any;
  wind: any;
  visibility: string;
  weather: Weather[];
  name: string;
  sys: {
    sunrise: number,
    sunset: number,
    country: string,
    // Other properties...
  };
  // Add other properties as needed
}

export interface RootState {
  currentWeatherData: any;
}
export const
  weather_unit = {
    temp: "C",
    pressure: " hpa",
    precip: " mm",
    wind_speed: " m/s",
    wind_dir: " &deg",
    visibility: " km"
  };
export const days_of_week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
export const image_arr = {
  rain: [
    "https://static.pexels.com/photos/268791/pexels-photo-268791.jpeg",
    "https://static.pexels.com/photos/268737/pexels-photo-268737.jpeg",
    "https://static.pexels.com/photos/457713/pexels-photo-457713.jpeg"
  ],
  snow: [
    "https://static.pexels.com/photos/371574/pexels-photo-371574.jpeg",
    "https://static.pexels.com/photos/289416/pexels-photo-289416.jpeg",
    "https://static.pexels.com/photos/306825/pexels-photo-306825.jpeg"
  ],
  clear: [
    "https://static.pexels.com/photos/72473/pexels-photo-72473.jpeg",
    "https://static.pexels.com/photos/590796/pexels-photo-590796.jpeg",
    "https://static.pexels.com/photos/96081/pexels-photo-96081.jpeg"
  ],
  atmospheric: [
    "https://static.pexels.com/photos/414491/pexels-photo-414491.jpeg",
    "https://static.pexels.com/photos/210711/pexels-photo-210711.jpeg",
    "https://static.pexels.com/photos/157304/pexels-photo-157304.jpeg"
  ],
  cloudy: [
    "https://static.pexels.com/photos/54537/pexels-photo-54537.jpeg",
    "https://static.pexels.com/photos/97558/pexels-photo-97558.jpeg",
    "https://static.pexels.com/photos/417045/pexels-photo-417045.jpeg"
  ],
  windy: [
    "https://static.pexels.com/photos/552600/pexels-photo-552600.jpeg.jpeg",
    "https://static.pexels.com/photos/243138/pexels-photo-243138.jpeg",
    "https://static.pexels.com/photos/118115/pexels-photo-118115.jpeg"
  ],
  cool: [
    "https://static.pexels.com/photos/35778/tree-avenue-back-light-sun.jpg",
    "https://static.pexels.com/photos/374592/pexels-photo-374592.jpeg",
    "https://static.pexels.com/photos/289390/pexels-photo-289390.jpeg"
  ],
  warm: [
    "https://static.pexels.com/photos/268959/pexels-photo-268959.jpeg",
    "https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg",
    "https://static.pexels.com/photos/52548/palm-reunion-island-sunset-evening-52548.jpeg"
  ],
  calm: [
    "https://static.pexels.com/photos/9277/nature-sky-summer-spring-9277.jpg",
    "https://static.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg",
    "https://static.pexels.com/photos/215/road-sky-clouds-cloudy.jpg"
  ],
  default: [
    "https://static.pexels.com/photos/531872/pexels-photo-531872.jpeg",
    "https://static.pexels.com/photos/531872/pexels-photo-531872.jpeg",
    "https://static.pexels.com/photos/531872/pexels-photo-531872.jpeg"
  ]
};