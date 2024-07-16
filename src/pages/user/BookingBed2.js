import React, { useState, useEffect } from 'react';

const DormitorySelector = () => {
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
      setRooms(floor ? floor.rooms : []);
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
            if ((!selectedRoom || room.id === parseInt(selectedRoom))&&room.roomType=={}) {
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

  return (
    <div>
      <h2>Dormitory Bed Selector</h2>
      
      <select value={selectedDorm} onChange={e => setSelectedDorm(e.target.value)}>
        <option value="">Select Dormitory</option>
        {dormitories.map(dorm => (
          <option key={dorm.id} value={dorm.id}>{dorm.name}</option>
        ))}
      </select>

      <select 
        value={selectedFloor} 
        onChange={e => setSelectedFloor(e.target.value)}
        disabled={!selectedDorm}
      >
        <option value="">Select Floor</option>
        {floors.map(floor => (
          <option key={floor.id} value={floor.id}>Floor {floor.floorNumber}</option>
        ))}
      </select>

      <select 
        value={selectedRoom} 
        onChange={e => setSelectedRoom(e.target.value)}
        disabled={!selectedFloor}
      >
        <option value="">Select Room</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>Room {room.roomNumber}</option>
        ))}
      </select>

      <h3>Available Beds:</h3>
      <ul>
        {freeBeds.map(bed => (
          <li key={bed.id}>
            Bed {bed.name} in Room {bed.roomNumber}, Floor {bed.floorNumber}
          </li>
        ))}
      </ul>
      <p>Total Available Beds: {availableBeds}</p>
    </div>
  );
};

export default DormitorySelector;