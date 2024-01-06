import React from "react";
import LoadingSvg from "../app/assets/loading.svg";
import Image from "next/image";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <LoadingSvg className="w-20 h-20 animate-spin fill-current text-purple-600" />
    </div>
  );
};

export default Loading;
