import React, { useState } from 'react';
import EventCard from './EventCard';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Archived');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const tabs = ['Upcoming', 'Ended', 'Archived'];
  // Fetch events from the server
  const fetchEvents = async (tab) => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/events?status=${tab.toLowerCase()}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]); // Clear events on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'start' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: activeTab === tab ? '#6f42c1' : '#ddd',
            color: activeTab === tab ? 'white' : '#000',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;