import React, { useState } from "react";

export default function DragComp({ onDrop }) {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      className={`p-5  w-full bg-white rounded-md flex flex-col gap-4  transition-all duration-100 ease-in-out ${
        showDrop ? "h-20 bg-gray-200 bg-opacity-40" : "h-4 opacity-0"
      } `}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault();

        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    ></div>
  );
}
