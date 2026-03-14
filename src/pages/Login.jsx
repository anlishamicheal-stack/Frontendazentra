import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const blushPink = "#FCE4EC";
const roseGold = "#AD1457";

function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("vendor");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username) {
      alert("Enter username");
      return;
    }

    // ADMIN LOGIN (only one admin allowed)
    if (role === "admin") {
      if (username.toLowerCase() !== "admin") {
        alert("Only main admin can login!");
        return;
      }

      localStorage.setItem("role", "admin");
      localStorage.setItem("currentUser", "admin");
      navigate("/admin");
      return;
    }

    // VENDOR LOGIN
    localStorage.setItem("role", "vendor");
    localStorage.setItem("currentUser", username);
    navigate("/vendor");
  };

  return (
    <div style={{ backgroundColor: blushPink, padding: "120px 0" }}>
      <Container style={{ maxWidth: "400px" }}>
        <h2 style={{ color: roseGold, textAlign: "center" }}>
          Login 👑
        </h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Select
            className="mb-3"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </Form.Select>

          <Button
            onClick={handleLogin}
            className="w-100"
            style={{ backgroundColor: roseGold, border: "none" }}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;