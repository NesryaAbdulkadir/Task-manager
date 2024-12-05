import React, { useEffect, useState } from "react";
import Doing from "../Doing";
import Todo from "../Todo";
import Done from "../Done";

export default function Home() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editTask, setEditTask] = useState(null);
  const [showTodoInput, setShowTodoInput] = useState(false);
  const [showDoingInput, setShowDoingInput] = useState(false);
  const [showDoneInput, setShowDoneInput] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, setTasks]);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      setTasks(JSON.parse(localStorageTasks));
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Todo
        showInput={showTodoInput}
        setShowInput={setShowTodoInput}
        tasks={tasks}
        setTasks={setTasks}
        setEditTask={setEditTask}
        editTask={editTask}
        name={"todo"}
      />
      <Doing
        showInput={showDoingInput}
        setShowInput={setShowDoingInput}
        tasks={tasks}
        setTasks={setTasks}
        setEditTask={setEditTask}
        editTask={editTask}
        name={"doing"}
      />
      <Done
        showInput={showDoneInput}
        setShowInput={setShowDoneInput}
        tasks={tasks}
        setTasks={setTasks}
        setEditTask={setEditTask}
        editTask={editTask}
        name={"done"}
      />
    </div>
  );
}
