import { useRef, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from "react-dom";
import Button from './Button';

const Modal = forwardRef((props, ref) => {
  const { title, desc, buttonCaption, children } = props;
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal()
      }
    };
  });

  return createPortal(
    <dialog className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md' ref={dialog}>
      <h2 className="text-xl font-bold text-stone-800 my-4">{title}</h2>
      <p>{desc}</p>
      <form method='dialog' className="mt-4 text-right">
        <Button label={buttonCaption} />
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;