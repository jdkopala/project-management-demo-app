import { useRef } from 'react';

import Input from './Input';
import Modal from './Modal';

export default function NewProject(props) {
  const { onCancel, onSave } = props

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const modalRef = useRef();

  const handleSave = () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const dueDate = dateRef.current.value;

    if (
      title.trim() === '' ||
      description.trim() === '' ||
      dueDate.trim() === ''
    ) {
      modalRef.current.open();
      return;
    }

    onSave({ title, description, dueDate })
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Ok">
        {/* TODO: Make this formatting more reusable */}
        <h2 className="text-xl font-bold text-stone-800 my-4">Invalid Input</h2>
        <p className="text-stone-700 mb-4">Looks like you forgot to enter a value.</p>
        <p className="text-stone-700 mb-4">Provide a value for every field.</p>
      </Modal>
      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button className='text-stone-800 hover:text-stone-950' onClick={onCancel}>Cancel</button>
          </li>
          <li>
            <button
              className='rounded-md px-6 py-2 bg-stone-800 text-stone-50 hover:bg-stone-950'
              onClick={handleSave}>
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={titleRef} type="text" label="Title" />
          <Input ref={descriptionRef} label="Description" textArea />
          <Input ref={dateRef} type="date" label="Due Date" />
        </div>
      </div>
    </>
  )
}