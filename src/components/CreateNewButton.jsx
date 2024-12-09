import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import CreateEventModal from './CreateEventModal';
import CreateOrganizerModal from './CreateOrganizerModal';

const CreateNewButton = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle style={{ backgroundColor: '#28a745', border: 'none', borderRadius: '4px' }}>
          + Create new
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowEventModal(true)}>Event</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowOrganizerModal(true)}>Organizer</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Modals */}
      <CreateEventModal show={showEventModal} handleClose={() => setShowEventModal(false)} />
      <CreateOrganizerModal show={showOrganizerModal} handleClose={() => setShowOrganizerModal(false)} />
    </>
  );
};

export default CreateNewButton;