import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails'
import { kelvinToCelsius } from '@/utils/KelvinToCelsius';

export interface Props extends WeatherDetailProps {
    icon: any;
    date: any;
    day: any;
    temp: any;
    feels_like: any;
    temp_min: any;
    temp_max: any;
    description: any;
}
  
export default function ForecastWeatherDetails(props : Props) {
  return (
    <Container className='py-4 '>
        {/* Left section */}
        <section className='flex gap-4 items-center px-4'>
            <div className='-mt-4'>
                <WeatherIcon iconName={props.icon}>
                </WeatherIcon>
                    <p className='text-sm text-center'>{props.date}</p>
                    <p className='text-sm text-center'>{props.day}</p>
            </div>

            <div className="flex flex-col">
                <span className='text-5xl'>{props.temp}</span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels like</span>
                    <span>{props.feels_like}</span>
                </p>
                <p className="capitalize">{props.description}</p>
            </div>
        </section>

        {/* Right section */}
        <section className="w-full flex justify-between overflow-x-auto gap-4 px-4 pr-10">
            <WeatherDetails {...props} />
        </section>
    </Container>
  )
}