

import TemplateUser from "../layout/LayoutUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function BookingBed() {
    const [page, setPage] = useState(true)
    const [typeRoom, settypeRoom] = useState()
    const [domid, setDomid] = useState(1);
    //     const [room, setRoom] = useState(rooms)
    const rooms = [
        {
            "id": "1",
            "type_room": "4 beds",
            cost: 850000
        },
        {
            "id": "2",
            "type_room": "3 beds",
            cost: 1000050
        }
    ]
    const [user, setUser] = useState({
        "id": 1,
        "username": "admin",
        "password": "admin123",
        "role": "student",
        "fullName": "John Doe",
        "gender": "male",
        "address": "123 Main St, Anytown USA",
        "phone": "1234567890",
        "avatar": "https://example.com/admin-avatar.jpg",
        cost: 10000000
    })

    const dormitories = [
        {
            "id": 1,
            "name": "A",
            type: 1,
            floors: [
                {
                    "id": 1,
                    "floorNumber": 1,
                    "totalBeds": 20,
                    "usedBeds": 7,
                    "freeBeds": 13,
                },
                {
                    "id": 2,
                    "floorNumber": 2,
                    "totalBeds": 20,
                    "usedBeds": 10,
                    "freeBeds": 10,
                },
                {
                    "id": 3,
                    "floorNumber": 3,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                }
            ]
        },
        {
            "id": 2,
            "name": "B",
            type: 1,
            floors: [
                {
                    "id": 1,
                    "floorNumber": 1,
                    "totalBeds": 20,
                    "usedBeds": 5,
                    "freeBeds": 15,
                },
                {
                    "id": 2,
                    "floorNumber": 2,
                    "totalBeds": 20,
                    "usedBeds": 10,
                    "freeBeds": 10,
                },
                {
                    "id": 3,
                    "floorNumber": 3,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                },
                {
                    "id": 4,
                    "floorNumber": 4,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                }
            ]
        },
        {
            "id": 3,
            "name": "C",
            type: 2,
            floors: [
                {
                    "id": 1,
                    "floorNumber": 1,
                    "totalBeds": 20,
                    "usedBeds": 7,
                    "freeBeds": 13,
                },
                {
                    "id": 2,
                    "floorNumber": 2,
                    "totalBeds": 20,
                    "usedBeds": 10,
                    "freeBeds": 10,
                },
                {
                    "id": 3,
                    "floorNumber": 3,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                }
            ]
        },
        
    ]


    const [doms, setDoms] = useState(dormitories)
    const next = () => {
        // if (cost) {
        setPage(false)
        // }
    }
    const [cost, setCost] = useState(0);
    const [floor, setFloor] = useState([]);
    const [freeBed, setFreeBed] = useState();
    const [floorID, setFloorID] = useState(1);
    function updateCost(event) {
        const id = event.target.value
        const rs = rooms.find((s) => s.id === id)
        setCost(rs.cost);
        settypeRoom(rs);
        setDoms(dormitories.filter(dorm => dorm.type == id))

    }
    useEffect(() => {
        const selectedDorms = doms?.filter((dorm) => dorm.id == domid);
        if (selectedDorms.length > 0) {
            const selectedDorm = selectedDorms[0];
            setFloor(selectedDorm.floors);
            const b = selectedDorm.floors.find((f) => f.id == floorID);
            if (b) {
                setFreeBed(b);
            } else {
                setFreeBed(selectedDorm.floors.find((f) => f.id == 1));
            }
        }
    }, [domid, floorID]);
    console.log(floor)
    console.log(floorID)
    console.log(freeBed)
    console.log(domid)
    const isCostValid = cost && cost > 0;
    return (
        <TemplateUser>
            {page ?
                <div className="">
                    <form className="flex flex-col gap-4">
                        <h1 style={{ color: '#034ea1', fontWeight: 'bold' }}>Choose Type Room</h1>
                        <h4 style={{ color: '#034ea1', }}>Room type</h4>
                        <select id="room" style={{
                            width: "100%", height: '40px', width: "100%",
                            height: '40px',
                            border: "1px solid #f36f21",
                            borderRadius: "12px",
                            padding: "5px 10px",
                            fontSize: "16px",
                            color: "#333",
                            backgroundColor: "#fff",
                            boxSizing: "border-box",
                            color: "#f36f21",
                        }} onChange={updateCost} >
                            <option value="" disabled selected>
                                Please choose Type of Room
                            </option>
                            {rooms.map(r => (
                                <option value={r.id} key={r.id} >{r.type_room} - {r.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</option>
                            ))}

                        </select>
                        <h4 style={{ color: '#034ea1', marginTop: "15px" }}>Price/Bed/Semester</h4>
                        <input id="costInput" value={cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"} disabled />
                        <button style={{ marginTop: "20px" }}
                            type="submit"
                            className={`btn rounded-lg w-24 h-10 flex justify-center items-center ${cost && user.cost > cost ? 'btn-success' : 'btn-secondary '
                                }`}
                            onClick={next}
                            disabled={!isCostValid || user.cost < cost}
                        >
                            Next
                        </button>
                        {user.cost < cost ? <span className="text-danger">Not enough Money</span> : <div></div>}
                    </form>
                </div>
                :
                <div>
                    <row>
                        <h1 style={{ color: '#034ea1', fontWeight: 'bold' }}>Detail Booking</h1>
                    </row>
                    <div className="row g-3">
                        <div className='col-md-5 col-xs-12'>
                            <h4>Your Account Balance</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{user.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h3>
                            <h4>Minimum Balance required in VND</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{typeRoom.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h3>
                            <h4>Your Balance atter booking</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{((user.cost) - typeRoom.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h3>
                            <h4>Số slot còn lại</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{freeBed?.freeBeds}</h3>
                        </div>
                        <div className='col-md-7 col-xs-12' style={{ marginTop: "40px" }}>
                            <form className="row">
                                <div className="col-md-6 ">
                                    <Link to={"/listroom"} style={{
                                        background: "#ffffff",
                                        border: "1px solid #f36f21",
                                        borderRadius: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#f36f21",
                                        height: "100%",
                                        textDecoration: "none",
                                        fontWeight: "bold"

                                    }} >
                                        See list room
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <label style={{ color: '#034ea1' }} className="form-label">Room Type</label>
                                    <input disabled style={{
                                        border: "1px solid",
                                        borderRadius: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }} value={`${typeRoom.type_room}-${cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
                                </div>
                                <div className="col-6" style={{ marginTop: "20px" }}>
                                    <label className="form-label" style={{ color: '#034ea1' }}>Dom</label>
                                    <select id="room" style={{
                                        width: "100%",
                                        height: '40px',
                                        border: "1px solid #f36f21",
                                        borderRadius: "12px",
                                        padding: "5px 10px",
                                        fontSize: "16px",
                                        color: "#333",
                                        backgroundColor: "#fff",
                                        boxSizing: "border-box",
                                        color: "#f36f21",
                                    }} onChange={(e) => setDomid(e.target.value)}>
                                        {doms.map(c => (
                                            <option value={c.id} >{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6" style={{ marginTop: "20px" }}>
                                    <label style={{ color: '#034ea1' }} className="form-label">Floor</label>
                                    <select id="room" style={{
                                        width: "100%",
                                        height: '40px',
                                        border: "1px solid #f36f21",
                                        borderRadius: "12px",
                                        padding: "5px 10px",
                                        fontSize: "16px",
                                        color: "#333",
                                        backgroundColor: "#fff",
                                        color: "#f36f21",
                                        boxSizing: "border-box"
                                    }} onChange={(e) => setFloorID(e.target.value)}>
                                        {floor?.map(c => (
                                            <option value={c.id} >{c.floorNumber}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12" style={{ marginTop: "30px" }}>
                                    <button className="btn btn-primary" style={{
                                        background: "#ffffff",
                                        border: "1px solid #f36f21",
                                        borderRadius: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#f36f21",
                                        height: "100%",
                                        lineHeight: "40px",
                                        width: "200px",
                                        textDecoration: "none",
                                        fontWeight: "bold"
                                    }}>Booking</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </TemplateUser>
    );
}
const style = {

}

export default BookingBed;