import { Delete, Edit } from "lucide-react";
import React from "react";

export default function Card({
  task,
  setTasks,
  setShowInput,
  setEditTask,
  index,
  setActiveCard,
}) {
  function handleEdit(task) {
    setShowInput(true);
    setEditTask(task);
  }
  function handleDelete(task) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.task !== task.task));
  }
  function handleDragStart() {
    setActiveCard(index);
  }
  return (
    <div
      className="p-5 bg-white shadow-md rounded-md flex flex-col gap-4 active:border-2 cursor-grab active:border-gray-400"
      onDragStart={handleDragStart}
      draggable
    >
      <div className="flex gap-4 justify-between">
        <p className="text-xl">{task.task}</p>
        <div className="flex gap-4">
          <button onClick={() => handleEdit(task)}>
            <Edit className="text-gray-500 hover:text-gray-900" />
          </button>
          <button onClick={() => handleDelete(task)}>
            <Delete className="text-gray-500 hover:text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
