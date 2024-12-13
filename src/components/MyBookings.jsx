import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Or pass user_id through context/state
// import apigClient from "./apigClient"; // Import your API client
import { Card, Row, Col, Button } from "react-bootstrap";
import { showLoading } from "react-global-loading";
import apigClient from "./api";
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  console.log('locatiojn',location)
  const { user_id } = location.state || {};
//   const userId = searchParams.get("user_id") || "default_user_id"; // Replace with logic to fetch user ID
console.log('UserID',user_id)

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

  useEffect(() => {
    const fetchBookings = async () => {
      showLoading(true)
      try {
        const response = await apigClient.getBookingsGet({
           user_id 
        });
	      console.log('Response',response)
        const data = response.data;
        setBookings(data.bookings || []);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Bookings not found (404).");
          setBookings([]); // Clear bookings or set an empty state
        } else {
          console.error("Error fetching bookings:", error);
        }
      }
      showLoading(false)
    };

    fetchBookings();
  }, [user_id]);

  const handleCancelBooking = async (event_id, payment_id) => {
    setIsLoading(true); // Show loader
    try {
      await apigClient.cancelPost(
        {},
        {
          user_id,
          event_id,
          payment_id,
        }
      );
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.event_id !== event_id)
      ); // Remove the cancelled booking from the list
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };



  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <Card className="mb-4" key={booking.payment_id}>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>{booking.name}</h5>
                  <p>
                    <strong>Venue:</strong> {booking.venue}, {booking.location}
                  </p>
                  <p>
                    <strong>Event Dates:</strong>{" "}
                    {formatDate(booking.start_date)} -{" "}
                    {formatDate(booking.end_date)}
                  </p>
                  <p>
                    <strong>Booking Time:</strong>{" "}
                    {formatDate(booking.booking_time)}
                  </p>
                  <p>
                    <strong>Booked Seats:</strong>{" "}
                    {booking.booked_seats.join(", ")}
                  </p>
                </Col>
                <Col md={4} className="text-md-end">
                  <p>
                    <strong>Booking ID:</strong> {booking.payment_id}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleCancelBooking(booking.event_id, booking.payment_id)
                    }
                    disabled={isLoading}
                  >
                    {isLoading ? "Cancelling..." : "Cancel Booking"}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default MyBookings;
