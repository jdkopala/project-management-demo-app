import noProjectImg from '../assets/no-projects.png';
import Button from './Button';

export default function NoProjectSelected(props) {
  const { onAddProject } = props;
  return (
    <div className='mt-24 text-center w-2/3'>
      <img src={noProjectImg} alt='An empty task list' className='w-16 h-16 object-contain mx-auto' />
      <title className='text-xl font-bold text-stone-500 my-4'>No Project Selected</title>
      <p className='text-stone-400 mb-4'>Select a Project or get started with a new one</p>
      <p className='mt-8'>
        <Button label='Create New Project' onClick={onAddProject} />
      </p>
    </div>
  )
}