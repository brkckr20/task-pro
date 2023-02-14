import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const error = (message) => toast.error(message);
export const success = (message) => toast.success(message);

const Notification = () => {

    return (
        <ToastContainer />
    )
}

export default Notification