import React, { useState } from "react";

export default function DragComp({ onDrop }) {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      className={`w-full bg-white rounded-md transition-all duration-100 ease-in-out ${
        showDrop ? "h-20 bg-gray-300 bg-opacity-40" : "h-4 opacity-0"
      } `}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    ></div>
  );
}
