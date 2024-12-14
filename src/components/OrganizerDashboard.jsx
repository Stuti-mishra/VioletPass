import React, { useState, useEffect } from 'react';
// import './OrganizerDashboard.css'; // Add styles if needed

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating API call to fetch events hosted by the organizer
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace this with an actual API call
        const response = await Promise.resolve([
          {
            id: 1,
            name: 'Music Festival 2024',
            ticketsBooked: 150,
            peopleCheckedIn: 120,
          },
          {
            id: 2,
            name: 'Tech Conference 2024',
            ticketsBooked: 200,
            peopleCheckedIn: 180,
          },
          {
            id: 3,
            name: 'Art Exhibition',
            ticketsBooked: 100,
            peopleCheckedIn: 90,
          },
        ]);
        setEvents(response);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Organizer Dashboard</h1>
      <table
        style={{
          width: '100%',
          marginTop: '2rem',
          borderCollapse: 'collapse',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Event Name</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Tickets Booked</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>People Checked In</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '0.5rem' }}>{event.name}</td>
              <td style={{ padding: '0.5rem' }}>{event.ticketsBooked}</td>
              <td style={{ padding: '0.5rem' }}>{event.peopleCheckedIn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizerDashboard;