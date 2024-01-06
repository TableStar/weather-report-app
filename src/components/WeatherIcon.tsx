import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { ReactHTML } from "react";

type Props = React.HTMLProps<HTMLDivElement>;

const WeatherIcon = (props: Props & {iconname:string}) => {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      <Image
        src={`https://openweathermap.org/img/wn/${props.iconname}@4x.png`}
        alt="weatherIcon"
        width={100}
        height={100}
        className="absolute w-full h-full"
      />
    </div>
  );
};

export default WeatherIcon;
