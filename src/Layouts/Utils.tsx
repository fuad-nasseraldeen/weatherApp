// import { addWeather } from '../actions/weather.js'
// import { useDispatch } from 'react-redux'
import { WeatherData, days_of_week, image_arr } from '../Components/types.tsx'

export const key_num = "&APPID=d92df2712015a7eced89203d86c9fdf5";


let w_data: WeatherData = {
    weather: [],
    name: '',
    sys: {
        country: '',
        sunset: 0,
        sunrise: 0
    },
    main: null,
    rain: null,
    snow: null,
    clouds: null,
    wind: null,
    visibility: ''
};

let w_data_arr: WeatherData[] = [w_data, w_data];


// @@@@@@@@@@ WEATHER FUNCTIONS @@@@@@@@@@
//===== Get geographic coordinates of user =====
export function getUserPosition(): Promise<GeolocationCoordinates> {
    const searchTime: number = 10000; // 10 seconds
    const shutDownTime: number = 20000; // 20 seconds

    const setOptions: PositionOptions = {
        enableHighAccuracy: false,
        timeout: searchTime,
        maximumAge: shutDownTime,
    };

    function rejectCoords(error: GeolocationPositionError): void {
        console.log("ERROR: " + error.message);
        const errorMsgElement = document.getElementById("error_msg_1");
        if (errorMsgElement) {
            errorMsgElement.innerHTML = "Error: Unable to obtain your location";
        }
    }

    return new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                resolve(position.coords);
            },
            rejectCoords,
            setOptions
        );
    });
} //eof()

//@@@@@ Get weather of remote location @@@@@
//===== Get the weather data of the city entered in textfield =====
export async function fetchRemoteWeather(city: any, country: any) {
    //define constiables for making a Cross-Orgin request
    let remoteURL = new URL(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "," +
        country +
        "&units=metric" +
        key_num
    );
    let headersObj = new Headers();
    headersObj.append("Accept", "application/json");
    let remoteMetricRequest = new Request(remoteURL, {
        method: "GET",
        headers: headersObj,
        mode: "cors"
    });
    //make request to Open Weather Map API server
    try {
        let response = await fetch(remoteMetricRequest);
        //parse response, assign response to data constiable
        w_data_arr[1] = await response.json();
        //use data in weather functions
        w_data = Object.assign({}, w_data_arr[0]);



        const element = document.getElementById("error_msg_1");
        if (element) {
            element.innerHTML = ''
        }
        return w_data
    } catch (error) {
        console.log("ERROR", error);

        const element = document.getElementById("error_msg_2");
        if (element) {
            element.innerHTML = 'Error: Could not obtain data from server.'
        }
    }
} //eof()

export const showTime = () => {
    const date = new Date();
    let h: number = date.getHours(); // 0 - 23
    let m: number = date.getMinutes(); // 0 - 59
    let s: number = date.getSeconds(); // 0 - 59
    let session: string = "AM";

    if (h === 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    const hStr: string = h < 10 ? "0" + h : h.toString();
    const mStr: string = m < 10 ? "0" + m : m.toString();
    const sStr: string = s < 10 ? "0" + s : s.toString();

    const time: string = hStr + ":" + mStr + ":" + sStr + " " + session;
    return time
}

export const getDay = () => {
    const date = new Date();
    return days_of_week[date.getDay()];
}

/*@@@@@@@@@@ BACKGROUND FUNCTIONS @@@@@@@@@@*/
export function show_background(id: any) {
    //w_data.weather[0].id
    //generate random number
    let ran_num = Math.floor(Math.random() * (3 - 0)) + 0;
    let backgroundImage = ''
    //test id to see if it matches a group
    if (id >= 200 && id <= 550) {
        backgroundImage = "url(" + image_arr.rain[ran_num] + ")";
    } else if (id >= 600 && id <= 630) {
        //rain
        backgroundImage = "url(" + image_arr.snow[ran_num] + ")";
    } else if (id === 800) {
        //snow
        backgroundImage = "url(" + image_arr.clear[ran_num] + ")";
    } else if (id >= 801 && id <= 810) {
        //clear
        backgroundImage = "url(" + image_arr.cloudy[ran_num] + ")";
    } else if (
        (id >= 900 && id <= 902) ||
        id === 905 ||
        id === 906 ||
        (id >= 956 && id <= 962)
    ) {
        //cloudy
        backgroundImage = "url(" + image_arr.windy[ran_num] + ")";
    } else if (id === 903) {
        //windy/extreme
        backgroundImage = "url(" + image_arr.cool[ran_num] + ")";
    } else if (id === 904) {
        //cool
        backgroundImage = "url(" + image_arr.warm[ran_num] + ")";
    } else if (id >= 951 && id <= 955) {
        //warm
        backgroundImage = "url(" + image_arr.calm[ran_num] + ")";
    } else if (id >= 701 && id <= 781) {
        //calm
        backgroundImage = "url(" + image_arr.atmospheric[ran_num] + ")";
    } else {
        //atmospheric
        backgroundImage = "url(" + image_arr.default[ran_num] + ")";
    } //default weather image
    return backgroundImage
} //eof()