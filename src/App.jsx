import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Tabs from './components/tabs';
import SearchBar from './components/SearchBar';
import CreateNewButton from './components/CreateNewButton';
import EventModal from './components/EventModal';
import BookTickets from './components/BookTickets';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import apigClient from './components/api';
import OrganizerDashboard from './components/OrganizerDashboard';

// Updated App Component
const App = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Mock event state
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [endedEvents, setEndedEvents] = useState([]);
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apigClient.eventsGet({}, {}, {});
        const data = response.data;
        const today = new Date();

        setEvents(data);
        setUpcomingEvents(data.filter(event => new Date(event.end_date) > today));
        setEndedEvents(data.filter(event => new Date(event.end_date) <= today));
        setArchivedEvents(data.filter(event => event.isArchived));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handlers for modal
  const handleKnowMore = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  // Redirect user to login if not authenticated
  const ProtectedRoute = ({ children }) => {
    if (!auth.isAuthenticated) {
      auth.signinRedirect();
      return <div>Redirecting to login...</div>;
    }
    return children;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        {auth.isAuthenticated ? (
          <>
            <pre>Hello: {auth.user?.profile.email}</pre>
            <button onClick={() => auth.removeUser()} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => auth.signinRedirect()} className="btn btn-primary">
            Login
          </button>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/organizer-dashboard"
          element={
            <ProtectedRoute>
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-ticket"
          element={
            <ProtectedRoute>
              <BookTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment_success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

// Home Page Component
const Home = () => (
  <div style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
    <h2>Welcome to the Event Booking App</h2>
    <p>Explore and book tickets for exciting events near you.</p>
  </div>
);

export default App;
