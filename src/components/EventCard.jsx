import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const EventCard = ({ event, onKnowMore }) => {
  return (
    <Card
      style={{
        width: "18rem",
        margin: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body>
        <Card.Title style={{ color: "#6f42c1" }}>{event.name}</Card.Title>
        <Card.Text>
          {/* {event.description} */}
          {`${capitalize(event.category)} at ${event.venue}`}
          <br />
          <strong>Location:</strong> {event.location || "N/A"}
          <br />
          <strong>Start:</strong> {event.startDate || "N/A"}
          <br />
          <strong>End:</strong> {event.endDate || "N/A"}
        </Card.Text>
        <Button variant="primary" onClick={() => onKnowMore(event)}>
          Know More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;