import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTickets.css';

const GRID_SIZE = 8; // 8x8 grid (8 rows, 8 columns)
const MAX_TICKET_LIMIT = 5; // Maximum tickets user can select

// Ticket prices by category
const TICKET_PRICES = {
  basic: 50,
  premium: 100,
  luxury: 200,
};

// Generate grid with ticket categories
const generateGrid = () => {
  const getRowLabel = (index) => String.fromCharCode(65 + index); // Rows as letters (A-Z)
  return Array.from({ length: GRID_SIZE }, (_, rowIndex) =>
    Array.from({ length: GRID_SIZE }, (_, colIndex) => {
      let category = 'basic'; // Default category
      if (rowIndex >= GRID_SIZE - 2) category = 'luxury'; // Last 2 rows are luxury
      else if (rowIndex >= GRID_SIZE - 4) category = 'premium'; // Next 2 rows are premium

      return {
        id: `${getRowLabel(rowIndex)}${colIndex + 1}`, // Example: A1, B2
        status: 'available',
        category,
	price: TICKET_PRICES[category], // Assign price based on category
      };
    })
  );
};

const BookTickets = () => {
  const [grid, setGrid] = useState(generateGrid());
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API call
  const navigate = useNavigate();

  const userId = 'user123'; // Simulated user ID

  const handleTicketClick = (ticket) => {
    if (ticket.status === 'booked') return;

    const isSelected = selectedTickets.find((t) => t.id === ticket.id);
    if (isSelected) {
      setSelectedTickets((prev) =>
        prev.filter((t) => t.id !== ticket.id)
      );
    } else {
      if (selectedTickets.length < MAX_TICKET_LIMIT) {
        setSelectedTickets((prev) => [...prev, ticket]);
      } else {
        alert(`You can only select up to ${MAX_TICKET_LIMIT} tickets!`);
      }
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedTickets.length === 0) {
      alert('Please select tickets before confirming booking!');
      return;
    }

    setLoading(true);

    try {
      // Mock API call
      const mockApiCall = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            tickets: selectedTickets.map((ticket) => ({
			id: ticket.id,
			category: ticket.category,
			price: ticket.price,
		})),
            lockTime: 300, // Lock time in seconds
            message: 'Tickets reserved successfully.',
          });
        }, 1000);
      });

      const data = await mockApiCall;

      if (data.success) {
        // Navigate to the payment screen with server response
        navigate('/payment', { state: { reservationDetails: data } });
      } else {
        alert('Reservation failed! Please try again.');
      }
    } catch (error) {
      console.error('Reservation failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTicketClass = (ticket) => {
    if (selectedTickets.find((t) => t.id === ticket.id)) return 'selected';
    return ticket.category; // Use category as the class for color
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Main Seats Section */}
          <h1 className="text-center mb-4">Ticket Booking</h1>
        <div className="col-lg-8 col-md-10 col-sm-12 text-end">
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row justify-content-center">
                {row.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`ticket ${getTicketClass(ticket)}`}
                    onClick={() => handleTicketClick(ticket)}
                  >
                    {ticket.id}
                  </div>
                ))}
              </div>
            ))}
	    <div className="actions text-center mt-4">
            <p>
              Selected Tickets: {selectedTickets.map((t) => t.id).join(', ')}
            </p>
            <button
              className="btn btn-primary"
              onClick={handleConfirmBooking}
              disabled={loading || selectedTickets.length === 0}
            >
              {loading ? 'Reserving...' : 'Confirm Booking'}
            </button>
          </div>
          </div>
          
        </div>

        {/* Legend Section */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="legend">
            <div className="legend-item">
              <span className="ticket basic"></span> Basic - $
              {TICKET_PRICES.basic}
            </div>
            <div className="legend-item">
              <span className="ticket premium"></span> Premium - $
              {TICKET_PRICES.premium}
            </div>
            <div className="legend-item">
              <span className="ticket luxury"></span> Luxury - $
              {TICKET_PRICES.luxury}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTickets;
