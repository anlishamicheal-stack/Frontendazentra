// src/pages/VendorLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const luxuryPink = "#EC407A";
const blushPink = "#FCE4EC";

export default function VendorLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
    const vendor = vendors.find(v => v.username === username && v.password === password);

    if (!vendor) return alert("Invalid username or password");

    localStorage.setItem("vendor", JSON.stringify(vendor));
    navigate("/vendor/dashboard");
  };

  return (
    <Container style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: blushPink }}>
      <Card style={{ padding: "30px", borderRadius: "15px", width: "400px", boxShadow: `0 8px 20px ${luxuryPink}33` }}>
        <h2 style={{ color: luxuryPink, textAlign: "center", marginBottom: "20px" }}>Vendor Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          </Form.Group>
          <Button type="submit" style={{ backgroundColor: luxuryPink, border: "none", width: "100%" }}>Login</Button>
        </Form>
      </Card>
    </Container>
  );
}