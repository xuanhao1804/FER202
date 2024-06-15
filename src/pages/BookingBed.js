

import LayoutUser from "../layout/LayoutUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const rooms = [
    {
        "id": "1",
        "room_id": "slot4",
        "type_room": "4 beds",
        "cost": 850000
    },
    {
        "id": "2",
        "room_id": "slot3",
        "type_room": "3 beds",
        "cost": 1500000
    }
]
const domss = [
    {
        "domName": "DomA",
        "domID": "A",
        "slot": "slot3",
        "totalBed": 132,
        "usedBed": 14,
        "freeBed": 118,
        "id": 1
    },
    {
        "domName": "DomB",
        "domID": "B",
        "slot": "slot3",
        "totalBed": 100,
        "usedBed": 52,
        "freeBed": 48,
        "id": 2
    }]
const BookingBed = () => {
    const [page, setPage] = useState(true)
    const [room, setRoom] = useState(rooms)
    const [cost, setCost] = useState()
    const [user, setUser] = useState({
        "id": 9,
        "name": "Trinh Van Toan",
        "email": "phuc@gmail.com",
        "phone": "0987654321",
        "address": "Ha Noi",
        "gender": "female",
        "StudentID": "He163510",
        "cost": 2500000
    })
    const [doms, setDoms] = useState(domss)
    const next = () => {
        if (cost) {
            setPage(false)
        }
    }
    function updateCost(event) {

        //tra ve 1 index o select
        const selectedIndex = event.target.selectedIndex - 1;
        //tra ve 1 mang dc chon

        const selectedOption = room[selectedIndex];


        const selectedCost = selectedOption.cost;
        const selectedTypeRoom = selectedOption.type_room;
        const selectedSlot = selectedOption.room_id
        setCost(selectedCost);
        setTypeRoom(selectedTypeRoom)
        setRoomId(selectedSlot)

    }

    return (
        <TemplateUser>
            {page ?
                <div className="">
                    <form className="flex flex-col gap-4">
                        <h1>Choose Type Room</h1>
                        <h4>Room type</h4>
                        <select id="room" style={{ width: "100%", height: '40px' }} >
                            <option value="" disabled selected>
                                Null
                            </option>
                            {room.map(r => (
                                <option value={r.id} key={r.id} >{r.type_room}-{r.cost}</option>
                            ))}
                        </select>
                        <h4>Price/Bed/Semester</h4>
                        <input id="costInput" value={cost} disabled />
                        <button type="button"
                            className="bg-teal-400 rounded-lg w-24 h-10 flex justify-center items-center"
                            onClick={next}>Next</button>
                    </form>
                </div>
                :
                <div className="">
                    <h1>Detail Booking</h1>
                    <div className="flex  gap-4 grid-cols-2 justify-around flex-wrap row">
                        <div className='w-96 p-8 gap-1 grid col-6'>
                            <h4>Your Account Balance</h4>
                            <p>{user.cost} VND</p>
                            <h4>Minimum Balance required in VND</h4>
                            <p>{cost}</p>
                            <h4>Your Balance atter booking</h4>
                            <p>{(user.cost) - cost}</p>
                            <h4>Số slot còn lại</h4>
                            <p>{freeBed}</p>
                        </div>
                        <div className='w-96 col-6'>
                            <form >
                                <div className="grid grid-cols-2 gap-4">
                                    <Link to={"/listroom"} style={{
                                        background: "#ffffff",
                                        border: "1px solid #f36f21",
                                        borderRadius: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#f36f21",
                                        height: '50px'
                                    }} >
                                        See list room
                                    </Link>
                                    <div>Room Type<input disabled value={`${typeRoom}-${cost}`} /></div>
                                    <div>DOM</div>
                                    <select id="room" style={{ width: "100%", height: '40px' }} onChange={updateBed}>
                                        <option value="" disabled selected>
                                            Null
                                        </option>

                                        {check.map(c => (
                                            <option value={c.id} >{c.domID}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>

                    {!page && (
                        <div>
                            {account.role === "student" ? (
                                (user.cost - cost >= 0 && freeBed !== 0) ? (
                                    <button className="btn btn-success" onClick={booking}>
                                        booking
                                    </button>
                                ) : (
                                    <p style={{ color: "red" }}>
                                        Sorry, you don't have enough money or empty slots
                                    </p>
                                )
                            ) : (
                                <p style={{ color: "green" }}>
                                    Sorry, you already have a room
                                </p>
                            )}


                        </div>
                    )}
                </div>}
        </TemplateUser>



    );
}

export default BookingBed;