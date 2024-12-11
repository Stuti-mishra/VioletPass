import React, { useEffect, useState, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css'; // Assume styling will be added for consistency

const Timer = memo(({ timeLeft, onTimeout }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      onTimeout();
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, [timeLeft, onTimeout]);

  return (
    <p><strong>Time Left to Pay:</strong> {timeLeft} seconds</p>
  );
});

Timer.displayName = 'Timer';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationDetails = location.state?.reservationDetails;
  console.log('reser',reservationDetails)

  const [timeLeft, setTimeLeft] = useState(reservationDetails?.lockTime || 0); // Lock time in seconds

  useEffect(() => {
    if (!reservationDetails) {
      navigate('/book-ticket');
      return;
    }
  }, [reservationDetails, navigate]);

  const handleTimeout = () => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        alert('Time expired! Tickets are now available to others.');
        navigate('/book-ticket'); // Redirect after timeout
        return 0;
      }
      return prev - 1;
    });
  };

  const handlePayment = () => {
    alert('Payment Successful!');
    navigate('/events'); // Redirect to events page after payment
  };

  if (!reservationDetails) return null;

  const totalPrice = reservationDetails.tickets.reduce(
    (sum, ticket) => sum + ticket.price,
    0
  );

  return (
    <div className="payment-page">
      <h1>Payment for Tickets</h1>
      <div className="reservation-details">
        <Timer timeLeft={timeLeft} onTimeout={handleTimeout} />
        <table className="table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {reservationDetails.tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.category}</td>
                <td>${ticket.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>
      <div className="payment-actions">
        <button
          onClick={handlePayment}
          disabled={timeLeft === 0}
          className="payment-button"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
