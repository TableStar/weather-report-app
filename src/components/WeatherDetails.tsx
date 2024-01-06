import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
export type WeatherDetailProps = {
  visibility: string;
  humidity: string;
  windspeed: string;
  airpressure: string;
  sunrise: string;
  sunset: string;
};

const WeatherDetails = (props: WeatherDetailProps) => {
  const {
    visibility = "0Km",
    humidity = "0%",
    windspeed = "0 km/h",
    airpressure = "0 hPa",
    sunrise = "00.00",
    sunset = "00.00",
  } = props;
  return (
    <>
      <SingleWeatherDetails
        icon={<LuEye />}
        information="Visibility"
        value={visibility}
      />
      <SingleWeatherDetails
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetails
        icon={<MdAir />}
        information="Wind Speed"
        value={windspeed}
      />
      <SingleWeatherDetails
        icon={<ImMeter />}
        information="Air Pressure"
        value={airpressure}
      />
      <SingleWeatherDetails
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetails
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
      />
    </>
  );
};

export default WeatherDetails;

export type SingleWeatherDetailsProps = {
  information: string;
  icon: React.ReactNode;
  value: string;
};
const SingleWeatherDetails = (props: SingleWeatherDetailsProps) => (
  <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
    <p className="whitespace-nowrap">{props.information}</p>
    <div className="text-3xl">{props.icon}</div>
    <p>{props.value}</p>
  </div>
);
