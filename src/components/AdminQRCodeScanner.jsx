import React, { useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { QrReader } from "react-qr-reader";

const AdminQRCodeScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false); // Toggle camera state
  const [showAlert, setShowAlert] = useState(false); // Control alert visibility

  const handleScan = (result, error) => {
    if (result) {
      setScannedData(result?.text);
    }
    if (error) {
      console.error(error);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive((prevState) => !prevState); // Toggle the camera
  };

  const dismissAlert = () => {
    setShowAlert(false); // Hide the alert
    setScannedData(""); // Clear scanned data
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <h2>QR Code Scanner</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          {isCameraActive ? (
            <QrReader
              scanDelay={300}
              onResult={handleScan}
              style={{ width: "100%" }}
            />
          ) : (
            <p className="text-center">Camera is off</p>
          )}
          <div className="text-center mt-3">
            <Button variant="primary" onClick={toggleCamera}>
              {isCameraActive ? "Turn Camera Off" : "Turn Camera On"}
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {scannedData && (
            <Alert variant="success" dismissible onClose={dismissAlert}>
              <h5>Scanned Data</h5>
              <p>{scannedData}</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminQRCodeScanner;
