const InputLabel = ({ type = "text", label, value, onChange, name }) => {
    return (
        <div className='w-full'>
            <label
                htmlFor={name}
                className={`p-1 text-sm font-semibold`}
            >{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                className='block w-full bg-white rounded text-lg appearance-none text-gray-900 focus:outline-none bg-transparent p-2'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputLabel