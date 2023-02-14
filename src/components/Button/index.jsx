import React from 'react'

const Button = ({ text, type = "button" }) => {
    return (
        <button type={type} className='bg-blue-500 hover:bg-blue-800 duration-150 px-2 py-1 lg:px-4 lg:py-2 lg:mt-2 text-white rounded-md'>{text}</button>
    )
}

export default Button