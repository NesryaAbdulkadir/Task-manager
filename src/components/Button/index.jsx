import React from "react";

export default function Button({
  showInput,
  setShowInput,
  name,
  handleClick,
  editTask,
}) {
  const handleButtonClick = () => {
    if (!showInput) {
      setShowInput(true);
    } else {
      handleClick();
    }
  };

  return (
    <button
      className="bg-gray-50 hover:bg-gray-100 rounded-md p-4 w-full"
      onClick={handleButtonClick}
    >
      {showInput ? "Submit Task" : "Add Task"}
    </button>
  );
}
