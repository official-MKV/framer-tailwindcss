"use client";
import React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const page = () => {
  const options = [
    { value: "electronics", label: "Electronics", color: "#4285F4" },
    { value: "clothing", label: "Clothing & Accessories", color: "#DB4437" },
    { value: "home", label: "Home & Garden", color: "#0F9D58" },
    { value: "beauty", label: "Beauty & Personal Care", color: "#F4B400" },
    { value: "sports", label: "Sports & Outdoors", color: "#4285F4" },
    { value: "books", label: "Books & Media", color: "#DB4437" },
    { value: "toys", label: "Toys & Games", color: "#F4B400" },
    { value: "food", label: "Food & Grocery", color: "#0F9D58" },
    { value: "health", label: "Health & Wellness", color: "#4285F4" },
    { value: "automotive", label: "Automotive", color: "#DB4437" },
  ];
  return (
    <div
      className="w-screen h-screen flex items-center justify-center
  "
    >
      <SelectInput options={options} />
    </div>
  );
};

const SelectInput = ({ options }) => {
  const [input, setInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selected, setSelected] = useState([
    { value: "electronics", label: "Electronics", color: "#4285F4" },
  ]);

  useEffect(() => {
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [input, options]);

  const handleSelectRemove = (key) => {
    const removedItem = selected[key];
    const updatedSelected = selected.filter((_, index) => index !== key);
    setSelected(updatedSelected);
    setFilteredOptions((prev) => [...prev, removedItem]);
  };

  const handleOptionSelect = (key) => {
    const selectedItem = filteredOptions[key];
    const updatedFilteredOptions = filteredOptions.filter(
      (_, index) => index !== key
    );
    setSelected((prev) => [...prev, selectedItem]);
    setFilteredOptions(updatedFilteredOptions);
  };

  return (
    <div className="relative bg-gray-100 rounded-lg border-2 flex px-3 h-fit py-[5px]">
      {selected.map((select, key) => (
        <span
          key={key}
          className="text-[10px] mr-2 font-extralight h-fit items-center justify-center rounded-full px-[5px] py-[3px] flex"
          style={{ backgroundColor: select?.color }}
        >
          <span className="max-w-[50px] clip text-nowrap whitespace-nowrap truncate text-ellipsis">
            {select.label}
          </span>
          <span
            className="text-[10px] px-[1px] rounded-full hover:bg-gray-400/40 cursor-pointer"
            onClick={() => handleSelectRemove(key)}
          >
            <X className="size-[10px]" />
          </span>
        </span>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="peer outline-none focus:border-blue-300 bg-transparent ml-1"
      />

      {input && (
        <div className="top-10 absolute peer-focus:flex flex-col transition-all duration-500 p-5 rounded-[30px] shadow-lg min-w-[200px]">
          {filteredOptions.length === 0 ? (
            <div className="text-[12px] text-gray w-full flex justify-center">
              no item
            </div>
          ) : (
            filteredOptions.map((item, key) => (
              <span
                className="text-[12px] mb-2 hover:bg-gray-50 cursor-pointer hover:font-medium"
                key={key}
                onClick={() => handleOptionSelect(key)}
              >
                {item.label}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default page;
