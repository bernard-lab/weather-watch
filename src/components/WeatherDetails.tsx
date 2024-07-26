import React from 'react'
import { FaEye, FaGaugeSimple } from 'react-icons/fa6';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { PiWindFill } from 'react-icons/pi';
import { WiHumidity } from 'react-icons/wi';

export type WeatherDetailProps = {
    visibility: any;
    humidity: any;
    windSpeed: any;
    airPressure: any;
    sunrise: any;
    sunset: any;
}

export default function WeatherDetails(props: WeatherDetailProps) {   
  return (
    <>
        <SingleWeatherDetail 
            icon={<FaEye />}
            information='Visibility'
            value={props.visibility}
        />
        <SingleWeatherDetail 
            icon={<WiHumidity className='text-[2.5rem]'/>}
            information='Humidity'
            value={props.humidity}
        />
        <SingleWeatherDetail 
            icon={<PiWindFill className='text-4xl'/> }
            information='Wind Speed'
            value={props.windSpeed}
        />
        <SingleWeatherDetail 
            icon={<FaGaugeSimple /> }
            information='Air Pressure'
            value={props.airPressure}
        />
        <SingleWeatherDetail 
            icon={<FiSunrise />}
            information='Sunrise'
            value={props.sunrise}
        />
        <SingleWeatherDetail 
            icon={<FiSunset />}
            information='Sunset'
            value={props.sunset}
        />
    </>
  )
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: number;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
    return (
        <div className='flex flex-col justify-between items-center gap-2 text-xs font-semibold text-slate-800'>
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}