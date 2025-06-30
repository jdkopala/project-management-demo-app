import { useRef, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from "react-dom";
import Button from './Button';

const Modal = forwardRef((props, ref) => {
  const { buttonCaption, children } = props;
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
      {children}
      <form method='dialog' className="mt-4 text-right">
        <Button label={buttonCaption} />
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;