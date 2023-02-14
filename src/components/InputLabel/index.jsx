const InputLabel = ({ type = "text", label, value, onChange, name }) => {
    return (
        <div className='w-full'>
            <label
                htmlFor={name}
                className={`px-1 sm:text-xs text-sm font-semibold`}
            >{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                className='block w-full bg-white rounded sm:text-sm lg:text-lg appearance-none text-gray-900 focus:outline-none bg-transparent p-2'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputLabel