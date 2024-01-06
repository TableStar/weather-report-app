"use client";
import React, { useEffect, useState } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { useGeolocated } from "react-geolocated";
type Props = { city: string };

const Navbar = (props: Props) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  console.log("🚀 ~ file: Navbar.tsx:11 ~ Navbar ~ error:", error);
  //
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);
  //
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });
  console.log(
    "🚀 ~ file: Navbar.tsx:22 ~ Navbar ~ isGeolocationAvailable:",
    isGeolocationAvailable
  );
  //
  const handleCurrentLoc = async () => {
    try {
      if (isGeolocationAvailable) {
        console.log("coords", coords?.latitude);
        setLoadingCity(true);
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords?.latitude}&lon=${coords?.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        setPlace(data.city.name);
        setTimeout(() => {
          setLoadingCity(false);
        }, 500);
      }
    } catch (error) {
      setLoadingCity(false);
    }
  };
  useEffect(() => {
    setLoadingCity(true);
    setTimeout(() => {
      handleCurrentLoc();
    }, 300);
  }, [isGeolocationAvailable, isGeolocationEnabled, coords?.latitude]);

  const handleInputChange = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const suggestions = response.data.list.map((val: any) => val.name);

        console.log(
          "🚀 ~ file: Navbar.tsx:23 ~ handleInputChange ~ response.data.list:",
          response.data.list
        );
        console.log(suggestions);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      // setPlace(city)
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(true);
  };
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
        setCity("");
      }, 500);
    }
  };
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-40 sm:h-[80px] w-full flex flex-col sm:flex-row justify-between items-center max-w-7xl py-3 sm:py-1 px-3 mx-auto space-y-3 sm:space-y-0">
        <div className="flex items-center justify-center gap-2 ">
          <h2 className="text-gray-500 text-3xl">Weather Report</h2>
          <MdWbSunny className="text-4xl mt-3 text-yellow-300" />
        </div>
        <section className="flex flex-col sm:flex-row gap-2 items-center">
          <div className="flex gap-2 items-center">
            <MdMyLocation
              title="Your Current Location"
              onClick={handleCurrentLoc}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm"> {props.city} </p>
          </div>
          <div className="relative">
            {/* SearchBox */}
            <SearchBox
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmitSearch}
            />
            <SuggestionBox
              {...{
                showsuggestions: showSuggestions,
                suggestions,
                handlesuggestionclick: handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;

export type SuggestionBoxProps = {
  showsuggestions: boolean;
  suggestions: string[];
  handlesuggestionclick: (item: string) => void;
  error: string;
};
export const SuggestionBox = ({
  showsuggestions,
  suggestions,
  handlesuggestionclick,
  error,
}: SuggestionBoxProps) => (
  <>
    {((showsuggestions && suggestions.length > 0) || error) && (
      <ul className="mb-4 bg-white absolute border top-11 left-0 border-gray-300 rounded-md min-w-52 flex flex-col gap-1 py-2 px-2">
        {error && suggestions.length < 1 && (
          <li className="text-red-500 p-1">{error}</li>
        )}
        {suggestions.map((item, idx) => (
          <li
            key={idx}
            onClick={() => handlesuggestionclick(item)}
            className="cursor-pointer p-1 rounded hover:bg-gray-200"
          >
            {item}
          </li>
        ))}
      </ul>
    )}
  </>
);
