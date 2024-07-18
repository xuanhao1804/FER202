import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import LayoutAdmin from "../../layout/LayoutAdmin";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Form } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

const ManageResident = () => {
  const [residentHistory, setResidentHistory] = useState([]);
  const [semesters, setSemesters] = useState({});
  const [dormitories, setDormitories] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [users, setUsers] = useState([]);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [availableSemesters, setAvailableSemesters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:9999/bookingRequests?status=approved&_expand=student`)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((booking) => ({
          ...booking,
          startSemester: booking.startSemester || booking.semester,
          endSemester: booking.endSemester || booking.semester,
        }));
        setResidentHistory(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching resident history:", error);
        toast.error("Error fetching resident history");
      });

    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    fetch(`http://localhost:9999/semesters`)
      .then((response) => response.json())
      .then((data) => {
        const semesterMap = {};
        data.forEach((semester) => {
          semesterMap[semester.name] = semester;
        });
        setSemesters(semesterMap);
      })
      .catch((error) => {
        console.error("Error fetching semesters:", error);
        toast.error("Error fetching semesters");
      });

    fetch(`http://localhost:9999/dormitories`)
      .then((response) => response.json())
      .then((data) => {
        const dormitoryMap = {};
        data.forEach((dormitory) => {
          dormitoryMap[dormitory.id] = dormitory.name;
        });
        setDormitories(dormitoryMap);
      })
      .catch((error) => {
        console.error("Error fetching dormitories:", error);
        toast.error("Error fetching dormitories");
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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isExpired: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResidentHistory(
          residentHistory.map((history) =>
            history.id === id ? { ...history, isExpired: newStatus } : history
          )
        );
        toast.success(`Residency ${newStatus ? "ended" : "reactivated"} successfully`);
        handleConfirmClose();
      })
      .catch((error) => {
        console.error("Error toggling residency:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleExtendShow = (history) => {
    setSelectedHistory(history);
    const currentSemester = semesters[history.endSemester];
    const futureAvailableSemesters = Object.values(semesters).filter(
      (sem) => new Date(sem.startDate) > new Date(currentSemester.endDate)
    );
    setAvailableSemesters(futureAvailableSemesters);
    setShowExtendModal(true);
  };

  const handleExtendClose = () => {
    setShowExtendModal(false);
    setSelectedSemester("");
  };

  const handleExtendResidency = () => {
    if (!selectedSemester) {
      toast.error("Please select a semester");
      return;
    }

    const updatedHistory = {
      ...selectedHistory,
      endSemester: selectedSemester,
      isExpired: false,
    };

    fetch(`http://localhost:9999/bookingRequests/${selectedHistory.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHistory),
    })
      .then((response) => response.json())
      .then((data) => {
        setResidentHistory(
          residentHistory.map((history) =>
            history.id === selectedHistory.id ? updatedHistory : history
          )
        );
        toast.success("Residency extended successfully");
        handleExtendClose();
      })
      .catch((error) => {
        console.error("Error extending residency:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const sortedHistory = residentHistory.sort((a, b) => {
    const dateA = semesters[a.endSemester]?.endDate;
    const dateB = semesters[b.endSemester]?.endDate;
    return new Date(dateB) - new Date(dateA);
  });

  const getSemesterDisplay = (history) => {
    return history.startSemester === history.endSemester
      ? history.startSemester
      : `${history.startSemester} - ${history.endSemester}`;
  };

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
                      <td>{history.studentId || "N/A"}</td>
                      <td>
                        {users.find((u) => u.studentID === history.studentId)?.fullName || "N/A"}
                      </td>
                      <td>{dormitories[history.dormitory] || `Dormitory ${history.dormitory}`}</td>
                      <td>{history.floor}</td>
                      <td>{history.room}</td>
                      <td>{history.bed}</td>
                      <td>{getSemesterDisplay(history)}</td>
                      <td>
                        {semesters[history.startSemester] &&
                          format(
                            new Date(semesters[history.startSemester].startDate),
                            "MMM dd, yyyy"
                          )}
                      </td>
                      <td>
                        {semesters[history.endSemester] &&
                          format(new Date(semesters[history.endSemester].endDate), "MMM dd, yyyy")}
                      </td>
                      <td>{history.isExpired ? "Expired" : "Active"}</td>

                      <td>
                        <div className="d-flex flex-column">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mb-2 w-100"
                            onClick={() => handleShow(history)}
                          >
                            Detail
                          </Button>
                          <Button
                            variant={history.isExpired ? "success" : "warning"}
                            size="sm"
                            className="mb-2 w-100"
                            onClick={() => handleConfirmShow(history)}
                          >
                            {history.isExpired ? "Reactivate" : "End Residency"}
                          </Button>
                          {!history.isExpired && (
                            <Button
                              variant="info"
                              size="sm"
                              className="w-100"
                              onClick={() => handleExtendShow(history)}
                            >
                              Extend
                            </Button>
                          )}
                        </div>
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
                <p>
                  <strong>Student ID:</strong> {selectedHistory.studentId || "N/A"}
                </p>
                <p>
                  <strong>Student Name:</strong>{" "}
                  {users.find((u) => u.studentID === selectedHistory.studentId)?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Dormitory:</strong>{" "}
                  {dormitories[selectedHistory.dormitory] ||
                    `Dormitory ${selectedHistory.dormitory}`}
                </p>
                <p>
                  <strong>Floor:</strong> {selectedHistory.floor}
                </p>
                <p>
                  <strong>Room:</strong> {selectedHistory.room}
                </p>
                <p>
                  <strong>Bed:</strong> {selectedHistory.bed}
                </p>
                <p>
                  <strong>Semester:</strong> {getSemesterDisplay(selectedHistory)}
                </p>
                {semesters[selectedHistory.startSemester] &&
                  semesters[selectedHistory.endSemester] && (
                    <>
                      <p>
                        <strong>Start Date:</strong>{" "}
                        {format(
                          new Date(semesters[selectedHistory.startSemester].startDate),
                          "MMM dd, yyyy"
                        )}
                      </p>
                      <p>
                        <strong>End Date:</strong>{" "}
                        {format(
                          new Date(semesters[selectedHistory.endSemester].endDate),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </>
                  )}
                <p>
                  <strong>Status:</strong> {selectedHistory.isExpired ? "Expired" : "Active"}
                </p>
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
              <p>
                Are you sure you want to {selectedHistory.isExpired ? "reactivate" : "end"} this
                residency?
              </p>
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

        <Modal show={showExtendModal} onHide={handleExtendClose}>
          <Modal.Header closeButton>
            <Modal.Title>Extend Residency</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Select new end semester</Form.Label>
              <Form.Control
                as="select"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="">Choose a semester</option>
                {availableSemesters.map((semester) => (
                  <option key={semester.name} value={semester.name}>
                    {semester.name} ({format(new Date(semester.startDate), "MMM dd, yyyy")} -{" "}
                    {format(new Date(semester.endDate), "MMM dd, yyyy")})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleExtendClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{ marginLeft: "40px" }}
              onClick={handleExtendResidency}
            >
              Extend
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
