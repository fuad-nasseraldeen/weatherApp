import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FetchRemoteWeatherComponent from '../API/fetchRemoteWeather.tsx';
import { currentWeatherData } from '../actions/weather.tsx';
import { showTime, getDay, show_background } from '../Layouts/Utils.tsx';
import { weather_unit, RootState } from './types.tsx';
import _ from 'lodash';

const CurrentWeather = () => {
    const dispatch = useDispatch();
    const currentWeather = useSelector((state: RootState) => state.currentWeatherData);
    const [currentTime, setCurrentTime] = useState(showTime()); // Initialize with the current time

    useEffect(() => {
        if (_.isEmpty(currentWeather)) {
            const fetchData = async () => {
                const data = await FetchRemoteWeatherComponent();
                if (data) {
                    dispatch(currentWeatherData(data));
                }
            };
            fetchData();
        }

        // Update the currentTime every second
        const intervalId = setInterval(() => {
            setCurrentTime(showTime());
        }, 1000); // 1000 milliseconds = 1 second

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch, currentWeather]);

    const { weather, sys, name, main, id } = currentWeather
    const country = !_.isEmpty(sys) && sys.country
    const temp_unit = weather_unit.temp
    const pressure_unit = weather_unit.pressure
    const temp = !_.isEmpty(main) && main.temp
    const currentDay = getDay();
    const backgroundImage = show_background(id)
    const description = !_.isEmpty(weather) && weather[0] && weather[0].description
    const icon = !_.isEmpty(weather) && weather[0] && weather[0].icon
    const _main = !_.isEmpty(main) && main
    const pressure = !_.isEmpty(main) && main.pressure.toFixed(1)
    const sunrise = !_.isEmpty(sys) && new Date(sys.sunrise * 1000).toLocaleTimeString()
    const sunset = !_.isEmpty(sys) && new Date(sys.sunset * 1000).toLocaleTimeString()
    return (
        <section
            id="currentWeather"
            className="currentWeather"
            style={{
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '50vh'
            }}
        >
            <div className="currentWeather__details">
                <div className='currentWeather__details-basic currentWeather-font'>
                    <h3 id="city">{name}</h3>
                    <h3 id="country">{country}</h3>
                </div>
                <div className='currentWeather__details-basic currentWeather-font'>
                    <h3 id="date"><span id="date_day"> {currentDay}</span> </h3>
                    <h3><span id="date_time">{currentTime}</span></h3>
                </div>
                <div className='currentWeather__details-spics currentWeather-font'>
                    <div id="weather_description">
                        <h3>{description}</h3>
                        <h3>
                            <span>{temp}</span> &deg; {temp_unit}</h3>
                    </div>
                    <img id="weather_image" src={`https://openweathermap.org/img/w/${icon}.png`} alt="icon for current weather condition" />

                </div>
            </div>
            <div className="currentWeather__description currentWeather-sub-font">
                {/* <h3 id="panel_top_content">Condition: {weather?.[0].main}</h3> */}
                <div className="temp-description">
                    <h4>Max Temprature: {_main.temp_max} &deg; {temp_unit}</h4>
                    <h4>Min Temprature: {_main.temp_min} &deg; {temp_unit}</h4>
                    <h5>Feels Like: {_main.feels_like} &deg; {temp_unit}</h5>
                    <h5>Humidity: {_main.humidity} %</h5>
                </div>
                <div className="time-description">
                    <h4>pressure: {pressure}{pressure_unit}</h4>
                    <h4>sunrise: {sunrise}</h4>
                    <h4>sunset: {sunset}</h4>
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;
