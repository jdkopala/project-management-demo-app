import { useState } from 'react';

export default function NewTask() {
  const [enteredTask, setEnteredTask] = useState();

  const handleChange = (event) => {
    setEnteredTask((event.target.value))
  };

  const handleSaveTask = () => {
    onSaveTask(enteredTask)
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <input type="text" className="w-[16rem] px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} />
      <button className="text-stone-700 hover:text-stone-950" onClick={handleSaveTask}>+ Add Task</button>
    </div>
  )
};