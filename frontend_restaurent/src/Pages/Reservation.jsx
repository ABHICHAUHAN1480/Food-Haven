import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@clerk/clerk-react'
import Booked from '../Constant/Booked';
import Confetti from 'react-confetti';
import ReservedTable from '../Constant/RersevedTable';

const Reservation = () => {
    const [loading, setloading] = useState(false);
    const [toggle, settoggle] = useState(true);
    const [fullname, setFullname] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [email, setemail] = useState("");
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [noofpeople, setnoofpeople] = useState("");
    const [specialrequest, setspecialrequest] = useState("");
    const [bookedid, setbookedid] = useState("");
    const { getToken } = useAuth();
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [tableno, settableno] = useState(0);
    const [reservearr, setreservearr] = useState([]);
    const [particulartable, setparticulartable] = useState({});

    useEffect(() => {
        if (!bookedid) return;

        const timer = setTimeout(() => {
            setbookedid("");
            settableno(0);

        }, 5000);

        return () => clearTimeout(timer);
    }, [bookedid]);

    useEffect(() => {
        reserved();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken();

        setloading(true);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        try {
            const bookingId = uuidv4();
            const response = await fetch(`${URL}/reserve/reservation`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname,
                    phoneNumber,
                    email,
                    date,
                    time,
                    noofpeople,
                    specialrequest,
                    bookingId
                }),
            });
            const data = await response.json();
            if (data.success) {
                setFullname("");
                setphoneNumber("");
                setemail("");
                setdate("");
                settime("");
                setnoofpeople("");
                setspecialrequest("");
                setbookedid(bookingId);
                settableno(data.data.tableno);
            }


            setloading(false);
        } catch (error) {
            console.error("Error:", error);
            setloading(false);
        }
    };

    const reserved = async () => {

        const token = await getToken();
        setloading(true);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        try {
            const response = await fetch(`${URL}/reserve/getreservations`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data.data);
            setreservearr(data.data);
            setloading(false);
        }
        catch (error) {
            console.error("Error:", error);
            setloading(false);
        }
    }



    return (
        <>
            <Navbar cartLength={-2} />
            {loading && (
                <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center gap-4">
                        <lord-icon
                            src="https://cdn.lordicon.com/dupxuoaa.json"
                            trigger="loop"
                            state="loop-transparency"
                            colors="primary:#ffffff"
                            style={{ width: 80, height: 80 }}
                        ></lord-icon>
                        <span className="text-white text-lg font-medium">Loading, please wait...</span>
                    </div>
                </div>
            )}
            <div className='min-h-[50vh] text-gray-900 bg-gradient-to-b from-orange-50 to-gray-100 cursor-default'>
                <div className='flex flex-col items-center gap-4 py-12 px-4 text-center'>
                    <h1 className='text-4xl font-bold text-gray-900 md:text-5xl'>Reserve Your Perfect Table</h1>
                    <p className='text-lg text-gray-600 max-w-2xl'>
                        Experience fine dining at its best. Secure your table in advance and enjoy a seamless culinary journey.
                    </p>
                </div>
                <button onClick={() => settoggle(prev => !prev)} className='bg-white md:hidden text-orange-500 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mt-8'>
                    {toggle ? "Ckeched booked" : "Reserve Table"}</button>


                <div className='flex items-center justify-center min-h-[50vh] p-4 sm:p-6'>
                    <div className='w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl'>
                        <div className='grid md:grid-cols-2'>

                            <div className='hidden md:flex flex-col  justify-between  bg-gradient-to-br from-orange-500 to-orange-700 p-8 text-white'>
                                <span><lord-icon
                                    src="https://cdn.lordicon.com/mwikjdwh.json"
                                    trigger="loop"
                                    colors="primary:#ffffff"
                                    style={{ width: "45px", height: "45px" }}
                                >
                                </lord-icon>
                                    <h2 className='text-4xl font-semibold mb-16'>Why Choose Us?</h2>
                                    <ul className='space-y-2 text-sm opacity-90'>
                                        <li className='items-center flex '><lord-icon
                                            src="https://cdn.lordicon.com/mzghzwpo.json"
                                            trigger="loop"
                                            colors="primary:#ffffff"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon> Priority seating for online reservations</li>
                                        <li className='flex items-center'><lord-icon
                                            src="https://cdn.lordicon.com/mhnfcfpf.json"
                                            trigger="loop"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon> Special offers & exclusive deals</li>
                                        <li className='flex items-center'><lord-icon
                                            src="https://cdn.lordicon.com/pogxzkfo.json"
                                            trigger="loop"
                                            colors="primary:#ffffff"
                                            style={{ width: "25px", height: "25px" }}>
                                        </lord-icon> Flexible cancellations</li>
                                        <li>🌟 Personalized service</li>
                                    </ul></span>
                                <button onClick={() => {
                                    settoggle(prev => !prev);
                                }} className='bg-white text-orange-500 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mt-8'>{toggle ? "Ckeched booked" : "Reserve Table"}</button>
                                <div className='mt-6'>
                                    <p className='text-sm'>📍 123 Fine Dine Street, vijay vihar, delhi</p>
                                    <p className='text-sm'>📧 reservations@foodheaven.com</p>
                                    <p className='text-sm'>📞 +1 (555) 123-4567</p>
                                </div>
                            </div>


                            {toggle ?
                                <div className='p-8'>
                                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Book Your Experience</h2>
                                    <p className='text-gray-500 mb-6'>We'll confirm your reservation within 24 hours</p>

                                    <form onSubmit={handleSubmit} className='space-y-5'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
                                            <input
                                                type="text"
                                                name="fullname"
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                required
                                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2  focus:ring-orange-200 transition-all bg-gray-100'
                                                placeholder='John Doe'
                                            />
                                        </div>

                                        <div className='grid gap-5 sm:grid-cols-2'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number *(no need for +91)</label>
                                                <input type='tel'
                                                    name="phoneNumber"
                                                    value={phoneNumber}

                                                    pattern="[0-9]{10}"
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        setphoneNumber(value.slice(0, 10));
                                                    }}

                                                    required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='9999900000' />
                                            </div>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                                                <input type='email'
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='john@example.com' />
                                            </div>
                                        </div>

                                        <div className='grid gap-5 sm:grid-cols-2'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Date *</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={date}
                                                    onChange={(e) => setdate(e.target.value)}
                                                    min={new Date().toISOString().split("T")[0]}
                                                    max={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                                                    style={{ colorScheme: "light" }}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100"
                                                />

                                            </div>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>Time (10:00 to 22:00)*</label>
                                                <input type='time'
                                                    name="time"
                                                    value={time}
                                                    onChange={(e) => settime(e.target.value)}
                                                    min='10:00' max='22:00' className='w-full  px-4 py-3  rounded-lg border border-gray-300  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all  bg-gray-100' style={{ colorScheme: "light" }} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>Number of People *</label>
                                            <input type='number'
                                                name="noofpeople"
                                                value={noofpeople}
                                                onChange={(e) => setnoofpeople(e.target.value)}
                                                min='1' max='20' required className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='Enter number of guests' />
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>Special Requests</label>
                                            <textarea rows='3'
                                                name="specialrequest"
                                                value={specialrequest}
                                                onChange={(e) => setspecialrequest(e.target.value)}
                                                className='w-full px-4 py-3 max-h-[100px] rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all bg-gray-100' placeholder='Dietary restrictions, celebrations, etc.' />
                                        </div>

                                        <button type='submit' className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'>
                                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                                            </svg>
                                            Confirm Reservation
                                        </button>
                                    </form>
                                </div> :
                                <div className='p-5 md:p-3 overflow-hidden relative     mx-auto'>
                                    {reservearr.length > 0 && (
                                        <div className="w-full max-w-3xl  mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200">
                                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
                                                Your Reservations
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-6 text-center">
                                                You have <span className="font-semibold text-orange-500">{reservearr.length}</span> reservations
                                            </p>

                                            <div className="space-y-4 max-h-[400px] overflow-y-auto hide-scrollbar ">
                                                {reservearr.map((item, index) => (
                                                    <div
                                                        onClick={() => setparticulartable(item)}
                                                        key={index}
                                                        className={`relative cursor-pointer mt-2 py-5 px-2 w-[95%] mx-auto rounded-lg shadow-md border border-gray-300 transition-transform duration-300 hover:scale-105 
        ${item.reservationstatus === "Confirmed" ? "bg-gray-50" : "bg-red-400"}`}
                                                    >
                                                          <div  className={`absolute bottom-1  rounded-md font-extrabold text-  ${item.reservationstatus === "Confirmed" ? "text-green-400" : "text-red-900"} right-1 w-[35%] h-[27%] flex items-center justify-center font-bold text-white  uppercase`}
            style={{boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
        >
            {item.reservationstatus === "Confirmed" ? "Confirmed" : "Expired"}
        </div>
                                                        <div     className={`absolute top-0 left-0 w-full h-full rounded-lg bg-opacity-50 pointer-events-none
${item.reservationstatus === "Confirmed" ? "bg-green-400" : "bg-red-700"} `}
                                                            style={{
                                                                clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)",
                                                                opacity: 0.2,
                                                            }}
                                                        ></div>

                                                        <p className="text-xl font-bold text-gray-800 mb-2 relative z-10">
                                                            Reservation {index + 1} ({new Date(item.reservationdate).toDateString()})
                                                        </p>
                                                        <p className="relative z-10">Name: {item.fullname}</p>
                                                        <p className="text-gray-700 text-sm relative z-10">
                                                            <span className="font-medium">Booking ID:</span>{" "}
                                                            <span className={`font-bold ${item.reservationstatus === "Confirmed" ? "text-orange-400" : "text-red-900"}`}>
                                                                {item.bookingId}
                                                            </span>
                                                        </p>
                                                        <p className="text-gray-700 text-sm relative z-10">
                                                            <span className="font-medium">Table No:</span>{" "}
                                                            <span className={`font-bold ${item.reservationstatus === "Confirmed" ? "text-green-400" : "text-green-900"}`}>
                                                                {item.tableno}
                                                            </span>
                                                        </p>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    )}


                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            {bookedid != "" && (
                <div className="top-0 left-0 z-[50] fixed flex justify-center items-center w-full h-screen bg-black/50">
                    <Confetti
                        numberOfPieces={800}
                        gravity={0.2}
                        wind={0.01}
                        recycle={false}
                        initialVelocityX={8}
                        initialVelocityY={15}
                    />
                    <Booked bookedid={bookedid} setbookedid={setbookedid} tableno={tableno} />
                </div>
            )}

            {Object.keys(particulartable).length !== 0 && (
                <div className=" top-24 fixed mx-auto z-[50]    w-full h-screen ">
                    <ReservedTable particulartable={particulartable} setparticulartable={setparticulartable} />
                </div>
            )}



            <Footer />
        </>
    )
}

export default Reservation
