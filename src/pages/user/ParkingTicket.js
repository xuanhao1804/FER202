

import TemplateUser from "../../layout/LayoutUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function ParkingTicket() {
    const [manufature, setManufature] = useState('');
    const [color, setColor] = useState('');
    const [ownerOfVehicle, setOwnerOfVehicle] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [nameType, setNameType] = useState('');
    const [page, setPage] = useState(true)
    const [user, setUser] = useState({
        "studentId": JSON.parse(localStorage.getItem("user")).studentID,
        cost: JSON.parse(localStorage.getItem("user")).balance
    })
    console.log("User state:", user); // Thêm dòng này
    const [bookingreq, setBookingreq] = useState([]);


    const next = () => {
        // if (cost) {
        setPage(false)
        // }
    }
    useEffect(() => {
        fetch(`http://localhost:9999/TypeVehicle`)
            .then(response => response.json())
            .then(data => {
                setTypeVehicle(data);
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
        price: 0
    });
    const [typeVehichle, setTypeVehicle] = useState([])


    const [dormitories, setDormitories] = useState([]);
    const [selectedDorm, setSelectedDorm] = useState('');
    const [floors, setFloors] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState('');
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [freeBeds, setFreeBeds] = useState([]);
    const [availableBeds, setAvailableBeds] = useState(0);
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${year}-${month}-${day}`;
    };
    const getEndDateOneMonthLater = () => {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);

        const day = String(nextMonth.getDate()).padStart(2, '0');
        const month = String(nextMonth.getMonth() + 1).padStart(2, '0');
        const year = nextMonth.getFullYear();

        return `${year}-${month}-${day}`;
    };




    function handleParking() {
        const newRequest = {
            studentID: user.studentId,
            type: cost.id,
            Manufature: manufature,
            Name: nameType,
            Color: color,
            Owner: ownerOfVehicle,
            NumberPlate: numberPlate,
            startDate: getCurrentDate(),
            EndDate: getEndDateOneMonthLater()
        }
        fetch('http://localhost:9999/ParkingTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRequest),
        })
        toast.success("Booking success")
    }
    function updateCost(event) {
        const id = event.target.value
        const rs = typeVehichle.find((s) => s.id == id)
        setCost(rs);
    }


    const isBooking = !bookingreq?.find(b =>
        b.studentId == user.studentId && // Đổi từ studentid sang studentId
        (b.status == "approved") &&
        !b.isExpired // Kiểm tra isExpired
    );
    const isCostValid = cost.price && cost.price > 0;
    const check = cost.name == `Bicycle`


    return (
        <TemplateUser>
            {page ?
                <div className="">
                    {isBooking ? (<div><h1>You Need to Booking first</h1></div>) :
                        (<form className="flex flex-col gap-4">
                            <h1 style={{ color: '#034ea1', fontWeight: 'bold' }}>Choose Type Vehicle</h1>
                            <h4 style={{ color: '#034ea1', }}>Vehicle type</h4>
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
                                    Please choose Type of Vehicle
                                </option>
                                {typeVehichle.map(r => (
                                    <option value={r.id} key={r.id} >{r.name} - {r.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</option>
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
                        </div>
                        <div className='col-md-7 col-xs-12' style={{ marginTop: "40px" }}>
                            <form className="row">


                                <div className="col-md-6">
                                    <label style={{ color: '#034ea1' }} className="form-label">Vehicle Type</label>
                                    <input disabled style={{
                                        border: "1px solid",
                                        borderRadius: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }} value={`${cost.name} - ${cost.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`} />
                                </div>
                                <div className="col-md-6">
                                    <label style={{ color: '#034ea1' }} className="form-label">Manufature</label>
                                    <input
                                        type="text"
                                        value={manufature}
                                        onChange={e => setManufature(e.target.value)}
                                        placeholder="Enter Manufature"
                                        style={{
                                            width: "100%",
                                            height: '40px',
                                            border: "1px solid #f36f21",
                                            borderRadius: "12px",
                                            padding: "5px 10px",
                                            fontSize: "16px",
                                            color: "#f36f21",
                                            backgroundColor: "#fff",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>

                                <div className="col-6" style={{ marginTop: "20px" }}>
                                    <label className="form-label" style={{ color: '#034ea1' }}>Name of Type</label>
                                    <input
                                        type="text"
                                        value={nameType}
                                        onChange={e => setNameType(e.target.value)}
                                        placeholder="Enter type "
                                        style={{
                                            width: "100%",
                                            height: '40px',
                                            border: "1px solid #f36f21",
                                            borderRadius: "12px",
                                            padding: "5px 10px",
                                            fontSize: "16px",
                                            color: "#f36f21",
                                            backgroundColor: "#fff",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>
                                <div className="col-6" style={{ marginTop: "20px" }}>
                                    <label style={{ color: '#034ea1' }} className="form-label">Color</label>
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={e => setColor(e.target.value)}
                                        placeholder="Enter Color "

                                        style={{
                                            width: "100%",
                                            height: '40px',
                                            border: "1px solid #f36f21",
                                            borderRadius: "12px",
                                            padding: "5px 10px",
                                            fontSize: "16px",
                                            color: "#f36f21",
                                            backgroundColor: "#fff",
                                            boxSizing: "border-box"
                                        }}
                                    />
                                </div>
                                {!check ? (
                                    <>
                                        <div className="col-6" style={{ marginTop: "20px" }}>
                                            <label style={{ color: '#034ea1' }} className="form-label">Owner of Vehicle</label>
                                            <input
                                                type="text"
                                                value={ownerOfVehicle}
                                                onChange={e => setOwnerOfVehicle(e.target.value)}
                                                placeholder="Enter Name"
                                                style={{
                                                    width: "100%",
                                                    height: '40px',
                                                    border: "1px solid #f36f21",
                                                    borderRadius: "12px",
                                                    padding: "5px 10px",
                                                    fontSize: "16px",
                                                    color: "#f36f21",
                                                    backgroundColor: "#fff",
                                                    boxSizing: "border-box"
                                                }}
                                            />
                                        </div>
                                        <div className="col-6" style={{ marginTop: "20px" }}>
                                            <label style={{ color: '#034ea1' }} className="form-label">Number Plate</label>
                                            <input
                                                type="text"
                                                value={numberPlate}
                                                onChange={e => setNumberPlate(e.target.value)}
                                                placeholder="Enter Number Plate"
                                                style={{
                                                    width: "100%",
                                                    height: '40px',
                                                    border: "1px solid #f36f21",
                                                    borderRadius: "12px",
                                                    padding: "5px 10px",
                                                    fontSize: "16px",
                                                    color: "#f36f21",
                                                    backgroundColor: "#fff",
                                                    boxSizing: "border-box"
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : null}
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
                                    }} disabled={color == '' || manufature == '' || ownerOfVehicle == '' || numberPlate == ``} onClick={(e) => {
                                        handleParking();
                                    }}>Booking</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >}
        </TemplateUser >
    );
}


export default ParkingTicket;