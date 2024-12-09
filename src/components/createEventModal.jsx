import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker

const CreateEventModal = ({ show, handleClose }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Organizer Section */}
          <Form.Group className="mb-3">
            <Form.Label>Who is organizing this event? *</Form.Label>
            <Form.Control as="select">
              <option>Select organizer</option>
              <option>Create an organizer</option>
            </Form.Control>
          </Form.Group>

          {/* Event Name */}
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control type="text" placeholder="Hi.Events Conference 2024" />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Event description here..." />
          </Form.Group>

          {/* Start Date */}
          <Form.Group className="mb-3">
            <Form.Label>Start Date *</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select a start date"
              className="form-control"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </Form.Group>

          {/* End Date */}
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select an end date"
              className="form-control"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Continue Event Setup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEventModal;