import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from 'react-bootstrap/Button';


const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const EventModal = ({ event, show, handleClose }) => {
  const navigate = useNavigate(); // Initialize navigate function
  if (!event) return null;

  const handleBookTicket = () => {
    // Redirect to ticket booking page
    navigate('/book-ticket', { state: { event } }); // Pass event data as state
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`${capitalize(event.category)} at ${
          event.venue
        }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Description:</strong> {event.description || "Not Available"}
        </p>
        <p>
          <strong>Start Date:</strong> {event.startDate || "Not Available"}
        </p>
        <p>
          <strong>End Date:</strong> {event.endDate || "Not Available"}
        </p>
        <p>
          <strong>Tickets Available:</strong>{" "}
          {event.available_tickets || "Not Available"}
        </p>
        <p>
          <strong>Total Tickets:</strong>{" "}
          {event.total_tickets || "Not Available"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleBookTicket}>
          Book Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;