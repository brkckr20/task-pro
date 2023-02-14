import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import InputLabel from '../components/InputLabel';
import Notification, { error } from '../components/Notification';
import SectorSelect from '../components/SectorSelect';
import { getSectors, newUser } from '../services';

const Register = () => {

    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(false);

    const initalFormValues = {
        name: "",
        username: "",
        password: "",
        sector: [],
        agree: false
    }
    const [form, setForm] = useState(initalFormValues);
    const history = useHistory();

    const selectSector = (sector) => {
        setForm({ ...form, sector: sector })
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.password || !form.agree || !form.sector) {
            error("Please fill in all fields!")
            return;
        }
        const response = await newUser(form);
        if (response.code === 11000) {
            error("This username already exist");
            return;
        }
        await localStorage.setItem("token", JSON.stringify(response.token));
        await localStorage.setItem("user", JSON.stringify(response.user));
        await localStorage.setItem("sectorName", JSON.stringify(response.sectorName));
        history.push("/dashboard");
        setForm(initalFormValues);
    }

    async function sectorList() {
        setLoading(true);
        const x = await getSectors();
        setLoading(false)
        setSectors(x)
    }

    useEffect(() => {
        sectorList();
    }, [])
    return (
        <>
            <div className='flex items-center justify-between py-1 w-full '>
                <h1 className='font-semibold text-xl py-2'>Please enter your name and pick the Sectors you are currently involved in.</h1>
            </div>
            <Notification />
            <form onSubmit={handleFormSubmit}>
                <h1 className='text-lg py-2'>Please fill in all fields : </h1>
                <div className='lg:flex gap-4'>
                    <InputLabel label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <InputLabel label="Username" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    <InputLabel label="Password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" />
                </div>
                <h1 className='text-lg py-2'>Please select a sector : </h1>
                <SectorSelect sectors={sectors} loading={loading} value={form.sector} onSelect={selectSector} name="sector" />
                <div className='my-1'>
                    <input type="checkbox" id='agree' checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} />
                    <label htmlFor='agree' className='ml-2 cursor-pointer'>Agree to terms</label>
                </div>
                <Button text="Save" />
            </form>
            <div className='flex gap-4 items-center mt-10'>
                <h1>Do you have an account?</h1>
                <Link to="/login" className='bg-red-500 text-white px-3 py-2 hover:bg-red-600 duration-200 rounded'>
                    Login
                </Link>
            </div>
        </>
    )
}

export default Register