import { Delete, Edit } from "lucide-react";
import React from "react";

export default function Card({
  task,
  setTasks,
  setShowInput,
  setEditTask,
  showInput,
}) {
  function handleStatusChange(newStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.task === task.task ? { ...t, status: newStatus } : t
      )
    );
  }

  function handleEdit(task) {
    setShowInput(true);
    setEditTask(task);
  }
  function handleDelete(task) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.task !== task.task));
  }

  return (
    <div className="p-5 bg-white shadow-md rounded-md flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <p className="text-xl">{task.task}</p>
        <div className="flex gap-4">
          <button onClick={() => handleEdit(task)}>
            <Edit />
          </button>
          <button onClick={() => handleDelete(task)}>
            <Delete />
          </button>
        </div>
      </div>
      <div className="flex gap-4 text-sm text-gray-500">
        {task?.status === "todo" && (
          <>
            <button onClick={() => handleStatusChange("done")}>Done</button>
            <button onClick={() => handleStatusChange("doing")}>Doing</button>
          </>
        )}
        {task?.status === "doing" && (
          <>
            <button onClick={() => handleStatusChange("todo")}>Todo</button>
            <button onClick={() => handleStatusChange("done")}>Done</button>
          </>
        )}
        {task?.status === "done" && (
          <>
            <button onClick={() => handleStatusChange("todo")}>Todo</button>
            <button onClick={() => handleStatusChange("doing")}>Doing</button>
          </>
        )}
      </div>
    </div>
  );
}
