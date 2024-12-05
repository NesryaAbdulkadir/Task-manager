import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Card from "../Card";

export default function Todo({
  showInput,
  setShowInput,
  name,
  editTask,
  setEditTask,
  tasks,
  setTasks,
}) {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (editTask) {
      setValue(editTask.task);
    } else {
      setValue("");
    }
  }, [editTask]);
  const handleClick = () => {
    if (value.trim() === "") return;
    if (editTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.task === editTask.task ? { ...task, task: value } : task
        )
      );
      setEditTask(null);
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          task: value,
          status: "todo",
        },
      ]);
    }

    setValue("");
    setShowInput(false);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  return (
    <div className="flex flex-col p-3 gap-4">
      <h2 className="text-2xl text-center">Todo</h2>
      {todoTasks?.map((task, index) => (
        <Card
          key={index}
          task={task}
          setTasks={setTasks}
          setShowInput={setShowInput}
          setEditTask={setEditTask}
        />
      ))}
      {showInput && <Input value={value} setValue={setValue} />}
      <Button
        showInput={showInput}
        setShowInput={setShowInput}
        name={name}
        handleClick={handleClick}
        editTask={editTask}
      />
    </div>
  );
}
