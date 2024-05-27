import { DateTime } from "luxon";

const API_KEY = "d8a010b805954fb5812a21550befb90d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
//poviding the city name as input the api will provide us with the weather data

//https://api.openweathermap.org/data/2.5/weather?q=india&appid=d8a010b805954fb5812a21550befb90d&units=metric

//change the url with the help of func
//URL build krre h.
//2.5/weather : we need to specify weather and city name.
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  
  return fetch(url).then((res) => res.json());  //return json file
};

//https://api.openweathermap.org/data/2.5/weather?q=india&appid=d8a010b805954fb5812a21550befb90d&units=imperial
//with the help of destructing we extract inf
//Only extracting information we want
//Fat arrow function
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,//date time span
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  //This all information is in (data)

  //Fetching from the weather array
  const { main: details, icon } = weather[0];//details from weather icon id

  return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed,};
};
 



const getFormattedWeatherData = async (searchParams) => { //This function will work in synchronized way 
  const formattedCurrentWeather = await getWeatherData("weather",searchParams).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  return { ...formattedCurrentWeather };
};
//Providing the local time
const formatToLocalTime = (secs,zone,format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//Selecting the icon as per the weather from api
const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;
  
 
export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
