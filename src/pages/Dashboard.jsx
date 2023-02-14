import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getSectors, updateUser } from '../services';
import SectorSelect from '../components/SectorSelect';

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
        const updatedUser = await updateUser(user._id, form)
        localStorage.setItem("user", JSON.stringify(updatedUser.user))
        localStorage.setItem("sectorName", updatedUser.sectorName);
        setSectorname(updatedUser.sectorName)
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
        <div className='container mx-auto'>
            <div className='text-right pt-2'>
                <button onClick={handleLogout} className='p-2 bg-red-700 hover:bg-red-900 duration-150 text-white rounded'>Logout</button>
            </div>
            <div className='flex flex-col'>
                <form onSubmit={handleUpdate}>
                    <div className='lg:flex gap-4 w-full'>
                        <div className='w-full'>
                            <label htmlFor="name">Name</label>
                            <input className='block w-full p-2 outline-none rounded' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="username">Username</label>
                            <input className='block w-full p-2 outline-none rounded' value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password">Password</label>
                            <input className='block w-full p-2 outline-none rounded' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold'>Current Sector : {sectorName}</h1>
                    </div>
                    <div className='mt-2'>
                        <h1>Choose one of the options below to change the sector!</h1>
                    </div>
                    <div className='mt-2'>
                        <SectorSelect sectors={sectors} loading={loading} onSelect={selectSector} name="sector" />
                    </div>
                    <div>
                        <button type='submit' className='p-2 bg-blue-600 hover:bg-blue-800 duration-150 text-white mt-2 rounded'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dashboard