import React from "react";

export default function Input({ value, setValue }) {
  return (
    <input
      type="text"
      placeholder="Add Task"
      value={value}
      className="bg-white shadow-md rounded-s-md p-4 w-full outline-none"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
