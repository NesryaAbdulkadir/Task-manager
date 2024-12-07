import React, { act, useEffect, useState } from "react";
import Doing from "../Doing";
import Todo from "../Todo";
import Done from "../Done";
import TaskColumn from "../TaskColumn";

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
    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((tasks, index) => index !== activeCard);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <TaskColumn
          title="Todo"
          status="todo"
          showInput={showTodoInput}
          setShowInput={setShowTodoInput}
          tasks={tasks}
          setTasks={setTasks}
          setEditTask={setEditTask}
          editTask={editTask}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Doing"
          status="doing"
          showInput={showDoingInput}
          setShowInput={setShowDoingInput}
          tasks={tasks}
          setTasks={setTasks}
          setEditTask={setEditTask}
          editTask={editTask}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          status="done"
          showInput={showDoneInput}
          setShowInput={setShowDoneInput}
          tasks={tasks}
          setTasks={setTasks}
          setEditTask={setEditTask}
          editTask={editTask}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </div>
    </>
  );
}
