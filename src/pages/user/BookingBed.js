

import TemplateUser from "../../layout/LayoutUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function BookingBed() {
    const [page, setPage] = useState(true)
    const [typeRoom, settypeRoom] = useState([])
    const [user, setUser] = useState({
        "studentID": JSON.parse(localStorage.getItem("user")).studentID,
        cost: JSON.parse(localStorage.getItem("user")).balance
    })
    const [bookingreq, setBookingreq] = useState([]);


    const next = () => {
        // if (cost) {
        setPage(false)
        // }
    }
    useEffect(() => {
        fetch(`http://localhost:9999/roomTypes`)
            .then(response => response.json())
            .then(data => {
                settypeRoom(data);
            })
            .catch(error => console.error('Error fetching typeroom:', error));
        fetch(`http://localhost:9999/bookingRequests`)
            .then(response => response.json())
            .then(data => {
                setBookingreq(data);
            })
            .catch(error => console.error('Error fetching typeroom:', error));
    }, [])
    const [cost, setCost] = useState({
        "id": 0,
        "type": "4 beds",
        "price": 0
    });


    const [dormitories, setDormitories] = useState([]);
    const [selectedDorm, setSelectedDorm] = useState('');
    const [floors, setFloors] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState('');
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [freeBeds, setFreeBeds] = useState([]);
    const [availableBeds, setAvailableBeds] = useState(0);

    useEffect(() => {
        fetch('http://localhost:9999/dormitories')
            .then(response => response.json())
            .then(data => {
                setDormitories(data);
                updateFreeBeds(data);
            })
            .catch(error => console.error('Error fetching dormitories:', error));
    }, []);

    useEffect(() => {
        if (selectedDorm) {
            const dorm = dormitories.find(d => d.id === selectedDorm);
            setFloors(dorm ? dorm.floors : []);
            setSelectedFloor('');
            setRooms([]);
            setSelectedRoom('');
            updateFreeBeds();
        }
    }, [selectedDorm, dormitories]);

    useEffect(() => {
        if (selectedFloor) {
            const dorm = dormitories.find(d => d.id === selectedDorm);
            const floor = dorm ? dorm.floors.find(f => f.id === parseInt(selectedFloor)) : null;

            setRooms(floor ? floor.rooms.filter(p => p.roomType == cost.type) : []);
            setSelectedRoom('');
            updateFreeBeds();
        }
    }, [selectedFloor, selectedDorm, dormitories]);

    useEffect(() => {
        if (selectedRoom) {
            updateFreeBeds();
        }
    }, [selectedRoom, selectedFloor, selectedDorm, dormitories]);

    const updateFreeBeds = () => {
        let beds = [];
        let count = 0;
        const dorm = dormitories.find(d => d.id === selectedDorm);
        if (dorm) {
            dorm.floors.forEach(floor => {
                if (!selectedFloor || floor.id === parseInt(selectedFloor)) {
                    floor.rooms.forEach(room => {
                        if ((!selectedRoom || room.id === parseInt(selectedRoom)) && room.roomType == cost.type) {
                            room.beds.forEach(bed => {
                                if (bed.status === 'available') {
                                    beds.push({
                                        id: bed.id,
                                        name: bed.name,
                                        roomNumber: room.roomNumber,
                                        floorNumber: floor.floorNumber
                                    });
                                    count++;
                                }
                            });
                        }
                    });
                }
            });
        }
        setFreeBeds(beds);
        setAvailableBeds(count);
    };
    function updateCost(event) {
        const id = event.target.value
        const rs = typeRoom.find((s) => s.id == id)
        setCost(rs);
    }

    function handleBooking() {
        fetch(`http://localhost:9999/bookingRequests`)
            .then(response => response.json())
            .then(data => {
                const bookingRequests = data;
                const maxId = bookingRequests.reduce((max, bookingRequest) => {
                    return bookingRequest.id > max ? bookingRequest.id : max;
                }, 0);
                const newRequest = {
                    id: (maxId + 1).toString(),
                    studentid: user.studentID,
                    dormitory: selectedDorm,
                    floor: selectedFloor,
                    room: selectedRoom,
                    bed: freeBeds[0]?.id,
                    semester: "Sum 2024",
                    status: "pending"
                }
                fetch('http://localhost:9999/bookingRequests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRequest),
                });
                alert("Create success");
            })
            .catch(error => console.error('Error fetching dormitories:', error));
    }
 
    const isBooking = !!bookingreq?.find(b => b.studentid == user.studentID && (b.status == "approved"||b.status == "pending"));
    const isCostValid = cost.price && cost.price > 0;
    
    return (
        <TemplateUser>
            {page ?
                <div className="">
                    {isBooking ? (<div><h1>Already Booking</h1></div>) :
                        (<form className="flex flex-col gap-4">
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
                                {typeRoom.map(r => (
                                    <option value={r.id} key={r.id} >{r.type} - {r.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</option>
                                ))}

                            </select>
                            <h4 style={{ color: '#034ea1', marginTop: "15px" }}>Price/Bed/Semester</h4>
                            <input id="costInput" value={cost.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"} disabled />
                            <button style={{ marginTop: "20px" }}
                                type="submit"
                                className={`btn btn-success rounded-lg w-24 h-10 flex justify-center items-center ${cost && user.cost > cost ? 'btn-success' : 'btn-secondary '
                                    }`}
                                onClick={next}
                                disabled={!isCostValid || user.cost < cost.price}
                            >
                                Next
                            </button>
                            {user.cost < cost.price ? <span className="text-danger">Not enough Money</span> : <div></div>}
                        </form>)}

                </div>
                :
                <div>
                    <row>
                        <h1 style={{ color: '#034ea1', fontWeight: 'bold' }}>Detail Booking</h1>
                    </row>
                    <div className="row g-3">
                        <div className='col-md-5 col-xs-12'>
                            <h4>Your Account Balance</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{user.cost?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h3>
                            <h4>Minimum Balance required in VND</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{cost.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h3>
                            <h4>Your Balance atter booking</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{((user.cost) - cost.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h3>
                            <h4>Số slot còn lại</h4>
                            <h3 style={{ color: '#034ea1', fontWeight: 'bold' }}>{availableBeds}</h3>
                            <ul>
                                {freeBeds.map(bed => (
                                    <li key={bed.id}>
                                        Bed {bed.name} in Room {bed.roomNumber}, Floor {bed.floorNumber}
                                    </li>
                                ))}
                            </ul>
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

                                    }} value={`${cost.type}-${cost.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
                                </div>
                                <div className="col-6" style={{ marginTop: "20px" }}>
                                    <label className="form-label" style={{ color: '#034ea1' }}>Dom</label>

                                    <select value={selectedDorm} style={{
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
                                    }} onChange={e => setSelectedDorm(e.target.value)}>
                                        <option value="">Select Dormitory</option>
                                        {dormitories.map(dorm => (
                                            <option key={dorm.id} value={dorm.id}>{dorm.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6" style={{ marginTop: "20px" }}>
                                    <label style={{ color: '#034ea1' }} className="form-label">Floor</label>
                                    <select
                                        value={selectedFloor}
                                        onChange={e => setSelectedFloor(e.target.value)}
                                        disabled={!selectedDorm}
                                        style={{
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
                                        }}
                                    >
                                        <option value="">Select Floor</option>
                                        {floors.map(floor => (
                                            <option key={floor.id} value={floor.id}>Floor {floor.floorNumber}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="" style={{ marginTop: "20px" }}>
                                    <label style={{ color: '#034ea1' }} className="form-label">Room</label>
                                    <select
                                        value={selectedRoom}
                                        onChange={e => setSelectedRoom(e.target.value)}
                                        disabled={!selectedFloor}
                                        style={{
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
                                        }}
                                    >
                                        <option value="">Select Room</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>Room {room.roomNumber}</option>
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

                                    }} disabled={selectedRoom == ''} onClick={handleBooking}>Booking</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >}
        </TemplateUser >
    );
}
const style = {

}

export default BookingBed;