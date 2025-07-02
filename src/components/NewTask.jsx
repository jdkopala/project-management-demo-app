import { useState, useRef } from 'react';

export default function NewTask(props) {
  const { onSaveTask } = props
  const [enteredTask, setEnteredTask] = useState('');

  const inputRef = useRef();

  const handleChange = (event) => {
    setEnteredTask((event.target.value));
  };

  const handleSaveTask = () => {
    if (enteredTask !== '') {
      onSaveTask(enteredTask);
      setEnteredTask('');
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <input ref={inputRef} type="text" className="w-[16rem] px-2 py-1 rounded-sm border-b-2 border-stone-700 bg-stone-200" onChange={handleChange} />
      <button className="text-stone-700 hover:text-stone-950" onClick={handleSaveTask}>+ Add Task</button>
    </div>
  )
};