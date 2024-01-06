import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";
type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const SearchBox = ({ onChange, onSubmit, value, className }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
    >
      <input
        type="text"
        value={value}
        placeholder="Search location..."
        onChange={onChange}
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-purple-700 h-full"
      />
      <button className="px-4 py-2 bg-purple-700 text-white rounded-r-md focus:outline-none hover:bg-purple-800 h-full">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
