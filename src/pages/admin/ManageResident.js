import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import LayoutAdmin from "../../layout/LayoutAdmin";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col } from 'react-bootstrap';

const ManageResident = () => {
  const [residentHistory, setResidentHistory] = useState([]);
  const [semesters, setSemesters] = useState({});
  const [dormitories, setDormitories] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch approved booking requests with expanded student information
    fetch(`http://localhost:9999/bookingRequests?status=approved&_expand=student`)
      .then(response => response.json())
      .then(data => setResidentHistory(data))
      .catch(error => {
        console.error('Error fetching resident history:', error);
        toast.error('Error fetching resident history');
      });
      fetch('http://localhost:9999/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.error('Error fetching users:', err));

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
      .catch(error => {
        console.error('Error fetching semesters:', error);
        toast.error('Error fetching semesters');
      });

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
      .catch(error => {
        console.error('Error fetching dormitories:', error);
        toast.error('Error fetching dormitories');
      });
  };

  const handleShow = (history) => {
    setSelectedHistory(history);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmShow = (history) => {
    setSelectedHistory(history);
    setShowConfirmModal(true);
  };

  const handleConfirmClose = () => setShowConfirmModal(false);

  const handleToggleResidency = (id, currentStatus) => {
    const newStatus = !currentStatus;
    fetch(`http://localhost:9999/bookingRequests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isExpired: newStatus }),
    })
    .then(response => response.json())
    .then(data => {
      setResidentHistory(residentHistory.map(history => 
        history.id === id ? { ...history, isExpired: newStatus } : history
      ));
      toast.success(`Residency ${newStatus ? 'ended' : 'reactivated'} successfully`);
      handleConfirmClose();
    })
    .catch(error => {
      console.error('Error toggling residency:', error);
      toast.error('An error occurred. Please try again.');
    });
  };

  // Sort resident history by end date (most recent first)
  const sortedHistory = residentHistory.sort((a, b) => {
    const dateA = semesters[a.semester]?.endDate;
    const dateB = semesters[b.semester]?.endDate;
    return new Date(dateB) - new Date(dateA);
  });

  return (
    <LayoutAdmin>
      <Col sm={11}>
        <div className="container-fluid">
          <h2 className="text-primary mb-4">Manage Residents</h2>
          {sortedHistory.length === 0 ? (
            <p className="text-muted">There are no current residents.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Dormitory</th>
                    <th>Floor</th>
                    <th>Room</th>
                    <th>Bed</th>
                    <th>Semester</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory.map((history) => (
                    <tr key={history.id}>
                      <td>{history.studentId || 'N/A'}</td>
                      <td>{users.find(u => u.studentID === history.studentId)?.fullName || 'N/A'}</td>

                      <td>{dormitories[history.dormitory] || `Dormitory ${history.dormitory}`}</td>
                      <td>{history.floor}</td>
                      <td>{history.room}</td>
                      <td>{history.bed}</td>
                      <td>{history.semester}</td>
                      <td>{semesters[history.semester] && format(new Date(semesters[history.semester].startDate), 'MMM dd, yyyy')}</td>
                      <td>{semesters[history.semester] && format(new Date(semesters[history.semester].endDate), 'MMM dd, yyyy')}</td>
                      <td>{history.isExpired ? 'Expired' : 'Active'}</td>
                      <td>
                        <Button variant="primary" size="sm" className="me-2" onClick={() => handleShow(history)}>
                          View Details
                        </Button>
                        <Button 
                          variant={history.isExpired ? "success" : "warning"} 
                          size="sm" 
                          onClick={() => handleConfirmShow(history)}
                        >
                          {history.isExpired ? 'Reactivate' : 'End Residency'}
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
                <p><strong>Student ID:</strong> {selectedHistory.studentId || 'N/A'}</p>
                <p><strong>Student Name:</strong> {selectedHistory.student?.fullName || 'N/A'}</p>
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
                <p><strong>Status:</strong> {selectedHistory.isExpired ? 'Expired' : 'Active'}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showConfirmModal} onHide={handleConfirmClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedHistory && (
              <p>Are you sure you want to {selectedHistory.isExpired ? 'reactivate' : 'end'} this residency?</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirmClose}>
              Cancel
            </Button>
            <Button 
              variant={selectedHistory?.isExpired ? "success" : "warning"} 
              onClick={() => handleToggleResidency(selectedHistory.id, selectedHistory.isExpired)}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </Col>
      <Col sm={1}></Col>
    </LayoutAdmin>
  );
};

export default ManageResident;