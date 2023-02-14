import React from 'react'

const Button = ({ text }) => {
    return (
        <button type='submit' className='bg-green-500 hover:bg-green-700 duration-150 px-4 py-2 mt-2 text-white rounded-md'>{text}</button>
    )
}

export default Button