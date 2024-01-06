import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { kelvinToCelcius } from "@/utils/celciusConverter";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weathericon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

const ForecastWeatherDetail = (props: ForecastWeatherDetailProps) => {
  const {
    weathericon = "02d",
    date = "01.01",
    day = "Sunday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <Container className="flex flex-col sm:flex-row gap-4">
      {/* left */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col sm:gap-1 items-center">
          <WeatherIcon iconname={weathericon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-5xl">{kelvinToCelcius(temp)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>feels like</span>
            <span>{kelvinToCelcius(feels_like)}°</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      {/* right */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10" >
        <WeatherDetails {...props}/>
      </section>
    </Container>
  );
};

export default ForecastWeatherDetail;
