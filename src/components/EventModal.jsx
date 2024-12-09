import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from 'react-bootstrap/Button';

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
        <Modal.Title>{event.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Start Date:</strong> {event.startDate}</p>
        <p><strong>End Date:</strong> {event.endDate}</p>
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