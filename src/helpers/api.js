import env from "react-dotenv";

const API_KEY = env.API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/';
const ONECALL_URL = `${BASE_URL}onecall?units=metric&appid=${API_KEY}`;
const FORECAST_URL = `${BASE_URL}forecast?units=metric&appid=${API_KEY}`;

export const getWeather = (cityName) => {
    return fetch(`${FORECAST_URL}&q=${cityName}`)
        .then((res) => res.json())
        .then((data) => {
            if (parseInt(data.cod) !== 200) {
                throw new Error(data.message)
            }

            const { lat, lon } = data.city.coord;

            return getWeatherByCoordenates(lat, lon, data.city.name)
        })
}

export const getWeatherByCoordenates = (lat, lon, cityName = '') => {
    return fetch(`${ONECALL_URL}&lat=${lat}&lon=${lon}`)
        .then((res) => res.json())
        .then((data) => {
            return {
                ...data,
                cityName
            }
        })
}