import { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import Search from './search';

const Weather = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const getWeather = async (city) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
            );
            console.log(response.data);
            if (response.data) {
                setLoading(false);
                setWeatherData(response.data);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getWeather('Minya');
    }, []);

    const handleSearch = () => {
        getWeather(search);
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const convertTempToCelsius = (temp) => {
        return (temp - 273.15).toFixed(2);
    };

    const isDayTime = (sunrise, sunset) => {
        const currentTime = new Date().getTime() / 1000;
        return currentTime > sunrise && currentTime < sunset;
    };

    const getWeatherIcon = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };
    const sun = weatherData?.sys?.sunrise
    const night = weatherData?.sys?.sunset
    return (
        <div className={isDayTime(sun, night) ? 'weather-day' : 'weather-night'}>
            <div className="container w-50 h-50">
                <div className='text-center py-1'>
                    <h1 className='fs-1 text-danger fw-bold'>Weather App</h1>
                </div>
                <div className={isDayTime(sun, night) ? 'day rounded-5' : 'night rounded-5'}>
                    <div className={isDayTime(sun, night) ? 'shadow d-flex align-items-center justify-content-center flex-column rounded-4' : 'shadow d-flex align-items-center justify-content-center nightimg text-light flex-column rounded-4'}>
                        <div className='mt-2 w-100'>
                            <Search search={search} setSearch={setSearch} handleSearch={handleSearch} isDayTime={isDayTime} sun={sun} night={night} />
                        </div>
                        {loading ? (
                            <h1>Loading data...</h1>
                        ) : (
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='text-center'>
                                    <div className="city">
                                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                                    </div>
                                    <div className='date'>
                                        <span>{getCurrentDate()}</span>
                                    </div>
                                    <div className="temp my-2">
                                        <h1>Temperature</h1>
                                        <h1>{weatherData?.main?.temp ? `${convertTempToCelsius(weatherData.main.temp)} °C` : ''}</h1>
                                    </div>
                                    <p className="description my-3 fs-3 ">
                                        {weatherData && weatherData.weather && weatherData.weather[0]
                                            ? weatherData.weather[0].description
                                            : ""}
                                    </p>
                                    {weatherData && weatherData.weather && weatherData.weather[0] && (
                                        <img
                                            src={getWeatherIcon(weatherData.weather[0].icon)}
                                            alt={weatherData.weather[0].description}
                                        />
                                    )}
                                    <div className="d-flex justify-content-evenly align-items-center ">
                                        <div className='fs-5 d-flex justify-content-between align-items-center px-5'>
                                            <i className="fa-solid fa-wind fs-2 mx-3"></i>
                                            <div>
                                                <p className="wind py-0">{weatherData?.wind?.speed} m/s</p>
                                                <p className='py-0'>Wind Speed</p>
                                            </div>
                                        </div>
                                        <div className='fs-5 d-flex justify-content-between align-items-center px-5'>
                                            <i className="fa-solid fa-water fs-2 mx-3"></i>
                                            <div>
                                                <p className="humidity lh-1 py-0">{weatherData?.main?.humidity}%</p>
                                                <p className='py-0'>Humidity</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-2 mb-5'>
                                        <p>{isDayTime(weatherData?.sys?.sunrise, weatherData?.sys?.sunset) ? 'Daytime' : 'Nighttime'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
