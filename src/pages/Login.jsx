import React, { useState } from 'react';
import { handleLogin } from '../services';
import { Link, useHistory } from 'react-router-dom';
import Notification, { error } from '../components/Notification';

const Login = () => {

    const history = useHistory();
    const initialFormValues = { username: "", password: "" }
    const [form, setForm] = useState(initialFormValues);


    const handleFormSubmit = async e => {
        e.preventDefault();
        if (!form.username || !form.password) {
            error("Username or password field cannot be left blank.");
            return;
        }
        const response = await handleLogin(form);
        if (response.status === "ok") {
            await localStorage.setItem("token", JSON.stringify(response.token))
            await localStorage.setItem("user", JSON.stringify(response.user))
            history.push("/dashboard");
        } else if (response.status === "error") {
            error(response.message);
        }
    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Notification />
            <div className=''>
                <form onSubmit={handleFormSubmit} className='w-[350px] mx-auto'>
                    <div className='w-[350px] mx-auto'>
                        <label className='block' htmlFor="username">Username</label>
                        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className='w-full p-2 border outline-none' name='username' type="text" id='username' />
                    </div>
                    <div className='w-full mt-2'>
                        <label className='block' htmlFor="password">Password</label>
                        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className='w-full p-2 border outline-none' name='password' type="password" id="password" />
                    </div>
                    <div className='mt-2'>
                        <button type='submit' className='bg-green-600 hover:bg-green-700 rounded w-full duration-150 p-2 text-white'>Login</button>
                    </div>
                </form>
                <div className='mt-2 w-[350px]'>
                    <Link to="/" className='bg-pink-600 hover:bg-pink-700 rounded inline-block text-center w-full duration-150 p-2 text-white'>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login