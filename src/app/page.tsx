"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
import { Weather } from "./weatherType";
import Loading from "@/components/Loading";
import { format, fromUnixTime } from "date-fns";
import Container from "@/components/Container";
import { kelvinToCelcius } from "@/utils/celciusConverter";
import { queryWeatherCurrentLoc } from "@/utils/queryFn";
import WeatherIcon from "@/components/WeatherIcon";
import { dayNightIcon } from "@/utils/dayNightIcon";
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import WeatherDetails from "@/components/WeatherDetails";
import { meterToKilo } from "@/utils/meterToKilo";
import { mPerSecToKiloPerHour } from "@/utils/mPerSecToKiloPerHour";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity,setLoadingCity] = useAtom(loadingCityAtom);
  console.log("🚀 ~ file: page.tsx:25 ~ Home ~ place:", place);
 

  const { isLoading, error, data, refetch, status } = useQuery<Weather>(
    "weatherData",
    async () =>
      queryWeatherCurrentLoc(place)
  );

  useEffect(() =>{
    refetch()
  },[place,refetch])

  console.log("🚀 ~ file: page.tsx:35 ~ Home ~ status:", status);
  const currData = data?.list[0];
  const timezoned = (date: string) => {
    return (
      new Date(date ?? "").getTime() +
      ((data?.city.timezone ?? 25200) - 3600) * 1000
    );
  };
  const uniqueForecast = [
    ...new Set(
      data?.list.map(
        (val) => new Date(val.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];
  const firstDataForEachDate = uniqueForecast.map((date) => {
    return data?.list.find((val) => {
      const entryDate = new Date(val.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(val.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  console.log(
    "🚀 ~ file: page.tsx:55 ~ firstDataForEachDate ~ firstDataForEachDate:",
    firstDataForEachDate
  );

  console.log("place",place);
  console.log("data", data?.list.length);

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar city={data?.city.name ?? ""} />
      {isLoading || loadingCity ? (
        <Loading />
      ) : (
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                <p>
                  {format(
                    new Date(currData?.dt_txt ?? new Date()).getTime() +
                      (data?.city.timezone ?? 0),
                    "EEEE"
                  )}
                </p>
                <p className="text-lg">
                  ({format(currData?.dt_txt ?? new Date(), "dd.MM.yyyy")})
                </p>
              </h2>
              <Container className="gap-10 px-6 items-center ">
                {/* temperature */}
                <div className="flex flex-col px-4">
                  <span className="text-5xl">
                    {kelvinToCelcius(currData?.main.temp)}°
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>feels like</span>
                    <span>{kelvinToCelcius(currData?.main.feels_like)}°</span>
                  </p>
                  <p>
                    <span>{kelvinToCelcius(currData?.main.temp_min)}°↓</span>
                    <span>{kelvinToCelcius(currData?.main.temp_max)}°↑</span>
                  </p>
                </div>
                {/* time and weather icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.slice(0, 9).map((data, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {format(timezoned(data.dt_txt), "h:mm a")}
                      </p>
                      <WeatherIcon
                        iconname={dayNightIcon(
                          data.weather[0].icon??"01d",
                          timezoned(data.dt_txt)
                        )}
                      />
                      <p>{kelvinToCelcius(data?.main.temp)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* left */}
              <Container className="w-full sm:w-fit justify-center flex-col px-4 items-center">
                <p className="capitalize sm:whitespace-nowrap">
                  {currData?.weather[0].description}
                </p>
                <WeatherIcon
                  iconname={dayNightIcon(
                    currData?.weather[0].icon ?? "",
                    timezoned(currData?.dt_txt ?? "")
                  )}
                />
              </Container>
              {/* right */}
              <Container className="bg-purple-500/80 px-6 gap-4 justify-between overflow-x-auto text-white">
                <WeatherDetails
                  visibility={meterToKilo(currData?.visibility ?? 1000)}
                  airpressure={`${currData?.main.pressure} hPa`}
                  humidity={`${currData?.main.humidity}%`}
                  windspeed={mPerSecToKiloPerHour(currData?.wind.speed ?? 0)}
                  sunrise={format(
                    fromUnixTime(
                      data?.city.sunrise ?? 0 + (data?.city.timezone ?? 0)
                    ),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(
                      data?.city.sunset ?? 0 + (data?.city.timezone ?? 0)
                    ),
                    "H:mm"
                  )}
                />
              </Container>
            </div>
          </section>
          {/* 7 day forecast data */}
          <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">Forecast (5 days) </p>
            {firstDataForEachDate.slice(1).map((val, idx) => (
              <ForecastWeatherDetail
                key={idx}
                description={val?.weather[0].description ?? ""}
                weathericon={val?.weather[0].icon ?? "01d"}
                date={format(
                  timezoned(val?.dt_txt ?? new Date().toISOString()),
                  "dd.MM"
                )}
                day={format(
                  timezoned(val?.dt_txt ?? new Date().toISOString()),
                  "EEEE"
                )}
                feels_like={val?.main.feels_like ?? 0}
                temp={val?.main.temp ?? 0}
                temp_max={val?.main.temp_max ?? 0}
                temp_min={val?.main.temp_min ?? 0}
                airpressure={`${val?.main.pressure} hPa`}
                humidity={`${val?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(
                    data?.city.sunrise ?? 0 + (data?.city.timezone ?? 0)
                  ),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(
                    data?.city.sunset ?? 0 + (data?.city.timezone ?? 0)
                  ),
                  "H:mm"
                )}
                visibility={meterToKilo(val?.visibility ?? 1000)}
                windspeed={mPerSecToKiloPerHour(val?.wind.speed ?? 0)}
              />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
