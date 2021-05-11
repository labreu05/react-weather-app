import React from 'react';

// TODO: Add Proptypes
const WeatherCard = ({ data }) => {
    const { temp, feels_like, weather, humidity, rain = 0, wind_speed, dt } = data;
    const { min, max, day: temperature } = temp;
    const { day: feelsLikeDay } = feels_like;
    const [{ main: mainCondition , description, icon }]  = weather;
    const entryDate = new Date(dt * 1000);

    return (
        <div className={`weather-card ${mainCondition}`}>
            <div className="mb-10 date">{entryDate.toDateString()}</div>
            <div className="bold mb-5">{`Min ${Math.round(min)}℃ - Max ${Math.round((max))}℃`}</div>
            <div className='forecast-container space-between'>
                <span className='center'>
                    <div className='bold day-temperature'>
                        {Math.round(temperature)}℃
                    </div>
                    <div>
                        Feels like {Math.round(feelsLikeDay)}℃
                    </div>
                </span>
                <span className='center'>
                    <img
                        className='weather-icon'
                        src={`http://openweathermap.org/img/w/${icon}.png`}
                        alt={'Weather Icon'}
                    />
                    <div className='bold forecast' style={{textTransform: 'capitalize'}}>
                        {description}
                    </div>
                </span>
            </div>
            <div className="mb-5 space-between">
                <span className='bold'>
                    Precipitation
                </span>
                <span>
                    {rain}%
                </span>
            </div>
            <div className="mb-5 space-between">
                <span className='bold'>
                    Humidity
                </span>
                <span>
                    {humidity}%
                </span>
            </div>
            <div className="mb-5 space-between">
                <span className='bold'>
                    Wind
                </span>
                <span>
                    {wind_speed} Km/h
                </span>
            </div>
        </div>
    )
}

export default WeatherCard;