const FloatingLabel = ({ type = "text", label, value, onChange, name }) => {

    return (
        <div className='relative mb-2 w-full bg-white rounded-md border border-gray-400 '>
            <label
                className="ml-2 text-sm"
            >{label}</label>
            <input
                name={name}
                type={type}
                className='block w-full text-lg appearance-none text-gray-900 focus:outline-none bg-transparent pl-2'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default FloatingLabel