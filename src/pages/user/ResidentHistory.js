import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import LayoutUser from "../../layout/LayoutUser";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ResidentHistory = () => {
  const [residentHistory, setResidentHistory] = useState([]);
  const [semesters, setSemesters] = useState({});
  const [dormitories, setDormitories] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user")).studentID;

  useEffect(() => {
    // Fetch approved booking requests
    fetch(`http://localhost:9999/bookingRequests?studentid=${userId}&status=approved`)
      .then(response => response.json())
      .then(data => setResidentHistory(data))
      .catch(error => console.error('Error fetching resident history:', error));

    // Fetch semesters
    fetch(`http://localhost:9999/semesters`)
      .then(response => response.json())
      .then(data => {
        const semesterMap = {};
        data.forEach(semester => {
          semesterMap[semester.name] = semester;
        });
        setSemesters(semesterMap);
      })
      .catch(error => console.error('Error fetching semesters:', error));

    // Fetch dormitories
    fetch(`http://localhost:9999/dormitories`)
      .then(response => response.json())
      .then(data => {
        const dormitoryMap = {};
        data.forEach(dormitory => {
          dormitoryMap[dormitory.id] = dormitory.name;
        });
        setDormitories(dormitoryMap);
      })
      .catch(error => console.error('Error fetching dormitories:', error));
  }, [userId]);

  const handleShow = (history) => {
    setSelectedHistory(history);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Sort resident history by end date (most recent first)
  const sortedHistory = residentHistory.sort((a, b) => {
    const dateA = semesters[a.semester]?.endDate;
    const dateB = semesters[b.semester]?.endDate;
    return new Date(dateB) - new Date(dateA);
  });

  return (
    <LayoutUser>
      <div className="container-fluid">
        <h2 className="text-primary mb-4">Your Resident History</h2>
        {sortedHistory.length === 0 ? (
          <p className="text-muted">You have no resident history.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Dormitory</th>
                  <th>Floor</th>
                  <th>Room</th>
                  <th>Bed</th>
                  <th>Semester</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((history) => (
                  <tr key={history.id}>
                    <td>{dormitories[history.dormitory] || `Dormitory ${history.dormitory}`}</td>
                    <td>{history.floor}</td>
                    <td>{history.room}</td>
                    <td>{history.bed}</td>
                    <td>{history.semester}</td>
                    <td>{semesters[history.semester] && format(new Date(semesters[history.semester].startDate), 'MMM dd, yyyy')}</td>
                    <td>{semesters[history.semester] && format(new Date(semesters[history.semester].endDate), 'MMM dd, yyyy')}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleShow(history)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resident Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHistory && (
            <>
              <p><strong>Dormitory:</strong> {dormitories[selectedHistory.dormitory] || `Dormitory ${selectedHistory.dormitory}`}</p>
              <p><strong>Floor:</strong> {selectedHistory.floor}</p>
              <p><strong>Room:</strong> {selectedHistory.room}</p>
              <p><strong>Bed:</strong> {selectedHistory.bed}</p>
              <p><strong>Semester:</strong> {selectedHistory.semester}</p>
              {semesters[selectedHistory.semester] && (
                <>
                  <p><strong>Start Date:</strong> {format(new Date(semesters[selectedHistory.semester].startDate), 'MMM dd, yyyy')}</p>
                  <p><strong>End Date:</strong> {format(new Date(semesters[selectedHistory.semester].endDate), 'MMM dd, yyyy')}</p>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </LayoutUser>
  );
};

export default ResidentHistory;