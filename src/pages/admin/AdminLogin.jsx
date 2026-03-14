// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const luxuryPink = "#EC407A";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin credentials hard-coded (example)
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (username === adminUsername && password === adminPassword) {
      // Save session
      localStorage.setItem("admin", JSON.stringify({ username }));
      navigate("/admin/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ padding: "30px", borderRadius: "15px", width: "400px", boxShadow: `0 8px 20px ${luxuryPink}33` }}>
        <h2 style={{ color: luxuryPink, marginBottom: "20px", textAlign: "center" }}>Admin Login</h2>
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