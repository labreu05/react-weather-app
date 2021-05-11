import React from 'react'
import WeatherCard from './components/WeatherCard'
import { Input, Spin, Alert } from 'antd';
import { getWeather } from './helpers/api'
import './styles.css'
import 'antd/dist/antd.css';

const { Search } = Input;

export default class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      city: null,
      loading: false,
      weather: null,
      error: null
    }

    this.onSearch = this.onSearch.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
  
    if (prevState.city !== this.state.city) {
      getWeather(city)
        .then((weather) => {
          this.setState({
            weather,
            loading: false,
            error: null
          })
        })
        .catch((e) => {
          this.setState({
            weather: null,
            loading: false,
            error: e.message
          })
        })
    }
  }

  onSearch(cityName) {
    if (cityName && cityName !== this.state.city) {
      this.setState({
        city: cityName,
        loading: true
      })
    }
  }

  render() {
    return (
      <div className='main-container'>
        <h1 className='title'>Weather App</h1>
        <Spin spinning={this.state.loading}>
          <div className="flex-center space-between">
            <Search
              placeholder="Enter the name of the city"
              size="large"
              style={{
                maxWidth: 400,
                padding: 20
              }}
              onSearch={this.onSearch}
            />
          </div>
          {this.state.weather && <h2 className='sub-title'>{this.state.weather.cityName}</h2>}
          {this.state.error
            ? <Alert
                style={{
                  margin: '0 auto',
                  textTransform: 'capitalize',
                  maxWidth: '350px'
                }}
                message="Error"
                description={this.state.error}
                type="error" />
            : (
            <div className='cards-container'>
              {this.state.weather && this.state.weather.daily.map((dailyWeather, index) => {
                return (
                  <WeatherCard key={`daily-${index}`} data={dailyWeather} />
                )
              })}
            </div>
          )}
        </Spin>
      </div>
    )
  }
}
