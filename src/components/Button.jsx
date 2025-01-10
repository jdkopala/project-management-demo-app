export default function Button(props) {
    const { label, onAddProject, ...rest } = props
    return (
        <button
            className='px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600'
            onClick={onAddProject}
            {...props}
        >
            {label}
        </button>
    );
};