import { Component, OnInit } from '@angular/core';
const API_KEY = "b119b329d272c221623477239bb9e91b"

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  WeatherData:any;

  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    };
    this.getWeatherData();
  }

  getWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=burlingame&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })
  }

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    const { temp, temp_min, temp_max, feels_like } = this.WeatherData.main

    this.WeatherData.temp_celcius = this.convertKelvinToFahrenheit(temp);
    this.WeatherData.temp_min = this.convertKelvinToFahrenheit(temp_min);
    this.WeatherData.temp_max = this.convertKelvinToFahrenheit(temp_max);
    this.WeatherData.temp_feels_like = this.convertKelvinToFahrenheit(feels_like);
  }

  convertKelvinToFahrenheit(temp){
    return ((temp - 273.15) * 9 / 5 + 32).toFixed(0)
  }

}
