import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Or pass user_id through context/state
// import apigClient from "./apigClient"; // Import your API client
import { ListGroup, Card } from "react-bootstrap";
import apigClient from "./api";
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  console.log('locatiojn',location)
  const { user_id } = location.state || {};
//   const userId = searchParams.get("user_id") || "default_user_id"; // Replace with logic to fetch user ID
console.log('UserID',user_id)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apigClient.getBookingsGet({
           user_id 
        });
	console.log('Response',response)
        const data = response.data;
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user_id]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <>
            <Card>
              <Card.Body>
                <Card.Title>
                  <em>Booking ID: {booking.payment_id}</em>
                </Card.Title>
                <Card.Text>
                  <strong>Booked Seats:</strong>{" "}
                  {booking.booked_seats.join(", ")}
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ))
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default MyBookings;
