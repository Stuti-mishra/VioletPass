import React, { useEffect, useState,useRef, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Timer = memo(({ timeLeft }) => (
  <p>
    <strong>Time Left to Pay:</strong> {timeLeft} seconds
  </p>
));

Timer.displayName = 'Timer';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

   
  const reservationDetails = location.state?.reservationDetails || {
    eventName: 'Music Festival 2024',
    lockTime: 300,
    tickets: [
      { id: 'A1', category: 'VIP', price: 200 },
      { id: 'A2', category: 'VIP', price: 200 },
    ],
  };
  console.log('Res',reservationDetails)

  const [timeLeft, setTimeLeft] = useState(reservationDetails.lockTime);
   const timerRef = useRef(null);

  useEffect(() => {
    // Start countdown timer
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            alert("Time expired! Tickets are now available to others.");
            navigate("/"); // Redirect after timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current); // Cleanup on component unmount
  }, []);

  const handleTimeout = () => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        alert('Time expired! Tickets are now available to others.');
        navigate('/'); // Redirect after timeout
        return 0;
      }
      return prev - 1;
    });
  };

  const handlePayment = () => {
    alert('Payment Successful!');
    navigate('/payment_success', {
      state: {
        name: 'John Doe', // Replace with dynamic user details
        eventName: reservationDetails.eventName,
        tickets: reservationDetails.tickets.length,
        event:reservationDetails.event,
        seats: reservationDetails.tickets.map((ticket) => ticket.seat_no),
      },
    });
  };

  if (!reservationDetails) return null;

 const totalPrice = reservationDetails.tickets.reduce(
   (sum, ticket) => sum + parseFloat(ticket.cost),
   0
 );


  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Payment for Tickets</h1>
      <Timer timeLeft={timeLeft} onTimeout={handleTimeout} />
      <table
        style={{ margin: "0 auto", borderCollapse: "collapse", width: "60%" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
              Ticket ID
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
              Category
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {reservationDetails.tickets.map((ticket) => (
            <tr key={ticket.seat_no}>
              <td style={{ padding: "0.5rem" }}>{ticket.seat_no}</td>
              <td style={{ padding: "0.5rem" }}>{ticket.category}</td>
              <td style={{ padding: "0.5rem" }}>${ticket.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <strong>Total Price:</strong> ${totalPrice}
      </p>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handlePayment}
        disabled={timeLeft === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;