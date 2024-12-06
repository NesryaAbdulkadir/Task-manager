import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Card from "../Card";
import DragComp from "../DragComp";

export default function Doing({
  showInput,
  setShowInput,
  name,
  editTask,
  setEditTask,
  tasks,
  setTasks,
  setActiveCard,
  activeCard,
  onDrop,
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
          status: "doing",
        },
      ]);
    }

    setValue("");
    setShowInput(false);
  };

  const doingTasks = tasks.filter((task) => task.status === "doing");

  return (
    <div className="flex flex-col p-3 gap-2">
      <h2 className="text-2xl text-center">Doing</h2>
      <DragComp onDrop={() => onDrop("doing", 0)} />
      {doingTasks?.map((task, index) => (
        <React.Fragment key={index}>
          <Card
            index={index}
            task={task}
            setTasks={setTasks}
            setEditTask={setEditTask}
            setShowInput={setShowInput}
            setActiveCard={setActiveCard}
            activeCard={activeCard}
          />
          <DragComp onDrop={() => onDrop("doing", index + 1)} />
        </React.Fragment>
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
