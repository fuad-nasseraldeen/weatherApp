import React, { useEffect, useState } from 'react';

import * as _ from 'lodash'
import Modal from '../Layouts/Modal.tsx';

const apiKey = 'f01661f5ec7c16ffa55f7a47d3d5f4d9';

const WeatherApp = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalBody, setModalBody] = useState<string | null>('');
    const [searchWeatherByCity, setSearchWeatherByCity] = useState<string | null>();
    const [temperature, setTemperature] = useState<number | null>(null);
    const [cityName, setCityName] = useState<string | null>(null);
    const [weatherStatus, setWeatherStatus] = useState<string | null>(null);
    const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

    useEffect(() => {
    }, []);

    const handleSearchWeather = () => {
        if (_.isEmpty(searchWeatherByCity)) {
            setModalBody("city value cannot be empty")
            setIsModalOpen(true)
        } else {
            fetchWeather()
        }
    }


    const fetchWeather = async () => {

        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchWeatherByCity}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.statusText}`);
            }

            const data = await response.json();
            const tempInKelvin = data.main.temp;
            const showCelcius = (tempInKelvin - 273.15).toFixed(2);

            setTemperature(parseFloat(showCelcius));
            setCityName(data.name); // Set the city name using data.name
            setWeatherStatus(data.weather[0].main);
            setWeatherIcon(data.weather[0].icon);
            setSearchWeatherByCity(null);

            console.log('Weather data fetched successfully');
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // You can handle the error here, e.g., show an error message to the user.

            setModalBody("Error fetching weather data, please try again later")
            setIsModalOpen(true)
        }
    };
    const modal = () => {
        const body = (
            <div className='flex flex-col items-center'>
                {modalBody}
            </div>
        )
        return (
            <div className='z-index-999'>
                {isModalOpen &&
                    <Modal setIsOpen={setIsModalOpen}>
                        {body}</Modal>}
            </div>
        )
    }
    const visibile = temperature || cityName || weatherStatus
    return (
        <section id="weather" className="weather">
            <div className="weather__container header">
                {modal()}
                <div className="search">
                    <input id="search-name" type="text" className="form-control header" placeholder="Enter city: London, UK" value={searchWeatherByCity || ''} onChange={e => setSearchWeatherByCity(e.target.value)} />
                    <button id="submit-btn" type="submit" className="btn btn-danger header" onClick={() => handleSearchWeather()}>Search</button>
                </div>
                {visibile && <div className="weather__container-status currentWeather-font">
                    <div className="content">
                        <h4>Temperature: {temperature}°C</h4>
                        <h4>City: {cityName}</h4>
                        <h4>Weather Status: {weatherStatus}</h4>
                    </div>
                    {weatherIcon && <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="Weather Icon" />}
                </div>}
            </div>
        </section>
    );
}

export default WeatherApp