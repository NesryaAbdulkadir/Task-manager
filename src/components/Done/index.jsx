import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Card from "../Card";
import DragComp from "../DragComp";

export default function Done({
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

  const [droppedItems, setDroppedItems] = useState([]);

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
          status: "done",
        },
      ]);
    }

    setValue("");
    setShowInput(false);
  };

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex flex-col p-3 gap-2">
      <h2 className="text-2xl text-center">Done</h2>
      <DragComp onDrop={() => onDrop("done", 0)} />

      {doneTasks?.map((task, index) => (
        <React.Fragment key={index}>
          <Card
            index={index}
            task={task}
            setTasks={setTasks}
            setShowInput={setShowInput}
            setEditTask={setEditTask}
            setActiveCard={setActiveCard}
            activeCard={activeCard}
          />
          <DragComp onDrop={() => onDrop("done", index + 1)} />
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
