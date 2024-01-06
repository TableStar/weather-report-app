import axios from "axios";

export const queryWeatherCurrentLoc = async (place: string) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    return data;

    // if (lat !== 0 && lon !== 0 && place.length < 2) {
    //   const { data } = await axios.get(
    //     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    //   );
    //   return data;
    // }
  } catch (error) {
    console.log(error);
  }
};
