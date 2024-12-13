import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {USERID} from '../utils'

const Header = () => {
  const navigate = useNavigate();

  const handleSelect = (eventKey) => {
    if (eventKey === "my-bookings") {
      navigate("/my-bookings", { state: { user_id: USERID } });
    } else if (eventKey === "logout") {
      // Add your logout logic here
      console.log("User logged out");
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#6f42c1",
        padding: "1rem",
        color: "white",
        position: "relative",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }} >VioletPass</h1>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "1rem",
          transform: "translateY(-50%)",
        }}
      >
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              fontSize: "1rem",
              boxShadow: "none",
            }}
          >
            Menu
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item eventKey="my-bookings">My Bookings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
