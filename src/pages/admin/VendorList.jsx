import { useState, useEffect } from "react";
import { Container, Button, Table, Modal, Form } from "react-bootstrap";

const luxuryPink = "#EC407A";  // Main pink
const blushPink = "#FCE4EC";   // Background soft pink
const roseGold = "#AD1457";    // Accent for pending

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    shop: "",
    username: "",
    password: "",
    approved: false
  });

  // Load vendors from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(data);
  }, []);

  // Update localStorage whenever vendors change
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addVendor = () => {
    if (!form.name || !form.shop || !form.username || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    const newVendor = { ...form, approved: false };
    setVendors([...vendors, newVendor]);
    setForm({ name: "", shop: "", username: "", password: "", approved: false });
    setShow(false);
  };

  const approveVendor = (index) => {
    const updated = [...vendors];
    updated[index].approved = true;
    setVendors(updated);
  };

  const deleteVendor = (index) => {
    const updated = vendors.filter((v, i) => i !== index);
    setVendors(updated);
  };

  return (
    <Container style={{ padding: "40px", backgroundColor: blushPink, borderRadius: "15px", boxShadow: `0 0 20px ${luxuryPink}55` }}>
      <h2 style={{ color: luxuryPink, marginBottom: "20px", fontWeight: "700" }}>Vendor List</h2>

      <Button
        onClick={() => setShow(true)}
        className="mb-3"
        style={{ backgroundColor: luxuryPink, border: "none", fontWeight: "600" }}
      >
        Add Vendor
      </Button>

      <Table bordered hover responsive style={{ backgroundColor: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <thead style={{ backgroundColor: luxuryPink, color: "#fff" }}>
          <tr>
            <th>Name</th>
            <th>Shop</th>
            <th>Username</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", fontWeight: "500", color: roseGold }}>
                No vendors added yet
              </td>
            </tr>
          )}
          {vendors.map((v, index) => (
            <tr key={index} style={{ fontWeight: "500" }}>
              <td>{v.name}</td>
              <td>{v.shop}</td>
              <td>{v.username}</td>
              <td style={{ color: v.approved ? "green" : roseGold }}>
                {v.approved ? "Approved" : "Pending"}
              </td>
              <td>
                {!v.approved && (
                  <Button
                    variant="success"
                    className="me-2"
                    style={{ fontWeight: "600" }}
                    onClick={() => approveVendor(index)}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  variant="danger"
                  style={{ fontWeight: "600" }}
                  onClick={() => deleteVendor(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Vendor Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: blushPink }}>
          <Modal.Title style={{ color: luxuryPink }}>Add Vendor</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: blushPink }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{ borderColor: luxuryPink }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Shop</Form.Label>
              <Form.Control
                name="shop"
                value={form.shop}
                onChange={handleChange}
                style={{ borderColor: luxuryPink }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={form.username}
                onChange={handleChange}
                style={{ borderColor: luxuryPink }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={{ borderColor: luxuryPink }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: blushPink }}>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: luxuryPink, border: "none" }} onClick={addVendor}>
            Add Vendor
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default VendorList;