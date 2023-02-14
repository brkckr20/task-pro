import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getSectors, updateUser } from '../services';
import Notification, { error, success } from '../components/Notification';
import SectorSelect from '../components/SectorSelect';
import InputLabel from '../components/InputLabel';
import Button from '../components/Button';

const Dashboard = () => {

    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sectorName, setSectorname] = useState(localStorage.getItem("sectorName"));

    const history = useHistory();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"))

    const [form, setForm] = useState({
        name: user?.name,
        username: user?.username,
        password: user?.password,
        sector: user?.sector
    })

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!form.name || !form.username || !form.password || !form.sector) {
            error("Please fill in all fields!");
        }
        const updatedUser = await updateUser(user._id, form)
        localStorage.setItem("user", JSON.stringify(updatedUser.user))
        localStorage.setItem("sectorName", updatedUser.sectorName);
        setSectorname(updatedUser.sectorName);
        success("Updated successfully");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push("/login");
    }

    const selectSector = (sector) => {
        setForm({ ...form, sector: sector })
    }

    async function sectorList() {
        setLoading(true);
        const x = await getSectors();
        setLoading(false)
        setSectors(x)
    }

    useEffect(() => {
        if (!token) {
            history.push("/login")
        }
        sectorList();
    }, [token, sectorName])

    return (
        <>
            <div className='text-right pt-2'>
                <button onClick={handleLogout} className='px-2 md:py-2  bg-red-700 hover:bg-red-900 duration-150 text-white rounded'>Logout</button>
            </div>
            <Notification />
            <div className='flex flex-col'>
                <form onSubmit={handleUpdate}>
                    <div className='lg:flex gap-4'>
                        <InputLabel label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <InputLabel label="Username" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                        <InputLabel label="Password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" />
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-sm md:text-base'>Current Sector : {sectorName}</h1>
                    </div>
                    <div className='mt-2'>
                        <h1 className='text-sm md:text-base'>Choose one of the options below to change the sector!</h1>
                    </div>
                    <div className='mt-2'>
                        <SectorSelect sectors={sectors} loading={loading} onSelect={selectSector} name="sector" />
                    </div>
                    <div className='mt-2'>
                        <Button type='submit' text="Update" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard