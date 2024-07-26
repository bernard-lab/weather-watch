"use client"

import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import { FaSpinner } from "react-icons/fa6";
import { useQuery } from "react-query";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { convertSpeedToKmh } from "@/utils/SpeedToKmh";
import { getVisibilityInKm } from "@/utils/VisibilityToKm";
import { getIconWithPod }  from "@/utils/IconWithPod";
import { kelvinToCelsius } from "@/utils/KelvinToCelsius";
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import WeatherSkeleton from "@/components/WeatherSkeleton";

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: City;
}

interface WeatherEntry {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '3h': number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}
export default function Home() {
  const [ cityName, setCityName ] = useAtom(placeAtom);
  const [loadingCity, _] = useAtom(loadingCityAtom);

  const { isLoading, data, error, refetch } = useQuery<WeatherData>('repoData', async () =>
  {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=50`);
      return data;
  }
);

useEffect(() => {
  refetch();
}, [cityName, refetch]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="animate-spin"><FaSpinner className="text-8xl text-sunnyYellow"/></p>
    </div>
  )
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <MdOutlineErrorOutline className="text-xl text-red"/>
      <p className="text-lg ">There was a problem connecting to weather service. Please come back later. </p>
    </div>
  )

const firstData = data?.list[0];
const forecastComponents: JSX.Element[] = [];

if (data?.list) {
  const uniqueDates = new Set<string>();
  
  for (let i = 1; i < data.list.length; i++) {
    const entry = data.list[i];
    const currentDate = format(parseISO(entry.dt_txt), 'EEEE');
    

  if (!uniqueDates.has(currentDate)) {
    uniqueDates.add(currentDate);

    forecastComponents.push(
      <ForecastWeatherDetails
        key={entry.dt_txt}
        icon={entry.weather[0].icon}
        date={currentDate}
        day={format(parseISO(entry.dt_txt), 'MMMM-dd')}
        temp={kelvinToCelsius(entry.main.temp)}
        feels_like={kelvinToCelsius(entry.main.feels_like)}
        temp_min={kelvinToCelsius(entry.main.temp_min)}
        temp_max={kelvinToCelsius(entry.main.temp_max)}
        description={entry.weather[0].description}
        visibility={getVisibilityInKm(entry.visibility)}
        humidity={`${entry.main.humidity}%`}
        windSpeed={convertSpeedToKmh(entry.wind.speed)}
        airPressure={`${entry.main.pressure} hPa`}
        sunrise={format(fromUnixTime(data?.city.sunrise ?? 1721770535), "hh:mm a")}
        sunset={format(fromUnixTime(data?.city.sunset ?? 1721816466), "hh:mm a")}
      />
    );

    // Break the loop once we have 5 unique items
    if (forecastComponents.length === 5) break;
  }
}
}

  return (
    <div className="flex flex-col gap-4 bg-deepBlue min-h-screen">
      <Navbar location={data?.city.name}/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
         {/* today data  */}
         {loadingCity ? (
          <WeatherSkeleton />
        ) : (
        <>
        <section>
          {/* Today data */}
          <div>
            <h2 className="space-x-2 text-2xl align-text-bottom mb-4">
              <span>{format(parseISO(firstData?.dt_txt ?? ""),'EEEE')}</span>
              <span className="text-lg">
                {format(parseISO(firstData?.  dt_txt ?? ""),'MMMM-dd-yyy')}
              </span>
            </h2>
            <Container>
              <div className="flex flex-col px-4 items-center justify-center">
                <p className="text-5xl">
                  { kelvinToCelsius(firstData?.main.temp) }&#176;
                </p>
                <span className="text-xs space-x-1 whitespace-nowrap">
                Feels like 
                {' ' + kelvinToCelsius(firstData?.main.feels_like) }&#176;
                </span>
                <p className="text-sm space-x-2">
                  <span>
                  { kelvinToCelsius(firstData?.main.temp_min) }&#176;&darr;
                  </span>
                  <span>                    
                    { kelvinToCelsius(firstData?.main.temp_max) }&#176;&uarr;
                  </span>
                </p>
              </div>

              <div className="w-full flex gap-10 sm:gap-16 overflow-x-auto justify-between pr-3">
                {data?.list.map((datum, i) => (
                  <div 
                  key={i}
                  className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(datum.dt_txt),'hh:mm a')}
                    </p>
                      <WeatherIcon iconName={getIconWithPod(datum)}/>
                    <p>
                      { kelvinToCelsius(firstData?.main.temp) }&#176;
                    </p>
                  </div>
                  ))
                }
              </div>
            </Container>
          </div>

          <div className="flex gap-4 mt-5">
              {/* Left container */}
              <Container className="w-fit justify-center flex-col px-4 items-center ">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon 
                  iconName={getIconWithPod(firstData)}/>
                {/* </div> */}
              </Container>

              {/* Right container */}
              <Container className="bg-sunnyYellow px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails 
                visibility = { getVisibilityInKm(firstData?.visibility) }// from meters to km
                humidity = { firstData?.main.humidity + "%" }
                windSpeed = { convertSpeedToKmh(firstData?.wind.speed) }
                airPressure = { firstData?.main.pressure + " hPa" }
                sunrise = { format(fromUnixTime(data?.city.sunrise ?? 1721770535), "hh:mm a")}
                sunset = { format(fromUnixTime(data?.city.sunset ?? 1721816466), "hh:mm a") }
              />
              </Container>
          </div>
      </section>

      {/* 5-day forecast */}
      <section className='flex w-full flex-col gap-4'>
         <p className="text-2xl">Next 5 Days: Weather Preview</p>   
         {forecastComponents}
      </section>
       </>
      )} 
      </main>
    </div>
  );
}

