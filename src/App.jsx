import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Tabs from './components/tabs';
import SearchBar from './components/SearchBar';
import CreateNewButton from './components/CreateNewButton';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import BookTickets from './components/BookTickets';
import Payment from './components/Payment';

// eslint-disable-next-line no-undef
var apigClient = apigClientFactory.newClient({
  apiKey: import.meta.env.API_KEY,
});

const App = () => {
  // Sample events data
  // const [events] = useState([
  //   {
  //     id: 1,
  //     name: 'Music Festival 2024',
  //     location: 'Central Park, NY',
  //     date: '2024-12-15',
  //     ticketsLeft: 25,
  //     description: 'An exciting music festival featuring top artists.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Tech Conference',
  //     location: 'Silicon Valley, CA',
  //     date: '2024-12-20',
  //     ticketsLeft: 50,
  //     description: 'Join us for an informative conference on tech innovations.',
  //   },
  //   {
  //     id: 3,
  //     name: 'Art Exhibition',
  //     location: 'Museum of Modern Art, NY',
  //     date: '2024-12-30',
  //     ticketsLeft: 10,
  //     description: 'Explore stunning art pieces from world-renowned artists.',
  //   },
  // ]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await apigClient.eventsGet({}, {}, {});
        console.log('Response',response)
        setEvents(response.data.body); // Update events with the fetched data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); // Trigger the fetch
  }, []);

  // State for the modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Open the modal with the selected event details
  const handleKnowMore = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  // Home Page Component
  const Home = () => (
    <div style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
      <h2>Welcome to the Event Booking App</h2>
      <p>Explore and book tickets for exciting events near you.</p>
    </div>
  );

  // Events Page Component
  const Events = () => (
    <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8f9fa' }}>
      <h2>All Events</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <SearchBar />
        <CreateNewButton />
      </div>
      <Tabs />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {events.map((event) => (
          <EventCard key={event.event_id} event={event} onKnowMore={handleKnowMore} />
        ))}
      </div>
      {/* Event Modal */}
      <EventModal event={selectedEvent} show={showModal} handleClose={handleCloseModal} />
    </div>
  );

  // Not Found Page
  const NotFound = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Routes>
        <Route path="/book-ticket" element={<BookTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<Events />} />
        {/* <Route path="/events" element={<Events />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
