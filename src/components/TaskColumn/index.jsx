import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Card from "../Card";
import DragComp from "../DragComp";

export default function TaskColumn({
  title,
  status,
  showInput,
  setShowInput,
  editTask,
  setEditTask,
  tasks,
  setTasks,
  setActiveCard,
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
          status: status,
        },
      ]);
    }

    setValue("");
    setShowInput(false);
  };

  return (
    <div className="flex flex-col p-3 ">
      <h2 className="text-2xl text-center">{title}</h2>
      <DragComp onDrop={() => onDrop(status, 0)} />
      {tasks?.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <Card
                index={index}
                task={task}
                setTasks={setTasks}
                setEditTask={setEditTask}
                setShowInput={setShowInput}
                setActiveCard={setActiveCard}
              />
              <DragComp onDrop={() => onDrop(status, index + 1)} />
            </React.Fragment>
          )
      )}
      {showInput && <Input value={value} setValue={setValue} />}
      <Button
        showInput={showInput}
        setShowInput={setShowInput}
        handleClick={handleClick}
      />
    </div>
  );
}
