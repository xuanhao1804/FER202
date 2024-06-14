import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    setShowModal(false);
    // Xử lý logout tại đây
  };

  return (
    <div className="header">
      <img src="https://ocd.fpt.edu.vn/Content/images/landing/logo.png" alt="Logo" />
      <nav>
        <ul>
          <Link to="/aaa" className="user-greeting">
            <p className="font" >Xin chào, User!</p> {/* Static user greeting for demonstration */}
          </Link>
          <Link to="/" className="font">Home</Link>
          <Link to="/about" className="font">About</Link>
          <Link to="/profile" className="font">Profile</Link>
          <Link onClick={toggleModal} className="font logout">Logout</Link>
        </ul>
      </nav>
      {/* <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal> */}
      <style>{`
        .header {
          padding: 10px;
        }

        .header img {
          height: 50px;
        }

        nav ul {
          list-style: none;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .user-greeting {
          margin-right: 40px; /* Adjust the margin to create desired spacing */
          text-decoration: none; /* Remove underline from the link itself */
          display: flex;
          align-items: center;
          border-radius: 5px;
          padding: 10px 15px;
          color: #5895ff;
          height: 40px; /* Ensure same height */
          border: 2px solid #5895ff; /* Add border and make it thicker */
          box-sizing: border-box; /* Ensure border-box sizing */
        }

        nav ul a {
          margin-right: 20px;
          font-weight: bold;
          border-radius: 5px;
          padding: 10px 15px;
          color: black; /* Change to black color for normal links */
          text-decoration: underline; /* Add underline to text */
          display: flex;
          align-items: center;
          height: 40px; /* Ensure same height */
        }

        nav ul a.logout {
          background-color: orange;
          color: white;
        }

        nav ul a.logout:hover {
          background-color: darkorange;
        }

        .user-greeting p {
          font-weight: bold;
          border-radius: 5px;
          padding: 10px 15px;
          color: #5895ff; /* Change to blue color for user greeting */
          text-decoration: underline; /* Add underline to text */
          margin: 0; /* Remove default margin */
          display: flex;
          align-items: center;
          height: 40px; /* Ensure same height */
        }
      `}
      </style>
    </div>
  );
}

export default Header;
