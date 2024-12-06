import React, { act, useEffect, useState } from "react";
import Doing from "../Doing";
import Todo from "../Todo";
import Done from "../Done";

export default function Home() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [activeCard, setActiveCard] = useState(null);
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
  const onDrop = (status, position) => {
    if (activeCard == null) return;

    const taskToMove = tasks[activeCard];
    if (!taskToMove) return;

    // Update task status
    const updatedTasks = tasks.filter((_, index) => index !== activeCard);
    if (position > updatedTasks.length) position = updatedTasks.length;

    updatedTasks.splice(position, 0, { ...taskToMove, status });

    setTasks(updatedTasks);
    setActiveCard(null); // Clear active card after drop
  };

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
        setActiveCard={setActiveCard}
        activeCard={activeCard}
        onDrop={onDrop}
      />
      <Doing
        showInput={showDoingInput}
        setShowInput={setShowDoingInput}
        tasks={tasks}
        setTasks={setTasks}
        setEditTask={setEditTask}
        editTask={editTask}
        name={"doing"}
        setActiveCard={setActiveCard}
        activeCard={activeCard}
        onDrop={onDrop}
      />
      <Done
        showInput={showDoneInput}
        setShowInput={setShowDoneInput}
        tasks={tasks}
        setTasks={setTasks}
        setEditTask={setEditTask}
        editTask={editTask}
        name={"done"}
        setActiveCard={setActiveCard}
        activeCard={activeCard}
        onDrop={onDrop}
      />
    </div>
  );
}
