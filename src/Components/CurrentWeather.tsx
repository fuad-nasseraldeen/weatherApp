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

    const { weather, sys, name, main, id } = currentWeather;
    const temp_unit = weather_unit?.temp;
    const pressure_unit = weather_unit?.pressure
    const currentDay = getDay();
    const backgroundImage = show_background(id)
    const pressure = (main?.pressure)?.toFixed(1)
    const sunrise = new Date(sys?.sunrise * 1000)?.toLocaleTimeString()
    const sunset = new Date(sys?.sunset * 1000)?.toLocaleTimeString()
    return (
        <section
            id="currentWeather"
            className="currentWeather"
            style={{
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="currentWeather__details">
                <div className='currentWeather__details-basic currentWeather-font'>
                    <h1 id="city" className=''>{name}</h1>
                    <h1 id="country">{sys?.country}</h1>
                    <h3 id="date"><span id="date_day"> {currentDay}</span> </h3>
                    <h3><span id="date_time">{currentTime}</span></h3>
                </div>
                <div className='currentWeather__details-spics currentWeather-font'>
                    <img id="weather_image" src={`https://openweathermap.org/img/w/${weather?.[0]?.icon}.png`} alt="icon for current weather condition" />
                    <div id="weather_description">
                        <h3 id="weather_description">{weather?.[0].description}</h3>
                        <h3 id="temp_main">
                            <span id="temp_main_val">{main?.temp}</span> &deg; {temp_unit}</h3>
                    </div>
                </div>
            </div>
            <div className="currentWeather__description currentWeather-sub-font">
                {/* <h3 id="panel_top_content">Condition: {weather?.[0].main}</h3> */}
                <div className="temp-description">
                    <h3>Max Temprature: {main?.temp_max} &deg; {temp_unit}</h3>
                    <h3>Min Temprature: {main?.temp_min} &deg; {temp_unit}</h3>
                    <h3>Feels Like: {main?.feels_like} &deg; {temp_unit}</h3>
                    <h3>Humidity: {main?.humidity} %</h3>
                </div>
                <div className="time-description">
                    <h3>pressure: {pressure}{pressure_unit}</h3>
                    <h3>sunrise: {sunrise}</h3>
                    <h3>sunset: {sunset}</h3>
            </div>
            </div>
        </section>
    );
};

export default CurrentWeather;
