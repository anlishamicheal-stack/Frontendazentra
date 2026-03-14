import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Nav, Modal, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const rosePink = "#E91E63";
const lightPink = "#FFE4EC";
const roseGold = "#AD1457";

function Dashboard() {

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const productsRef = useRef(null);
  const ordersRef = useRef(null);

  const [showVendorModal, setShowVendorModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    shop: "",
    product: "",
    price: "",
    username: "",
    password: "",
    approved: false
  });

  // LOAD DATA
  useEffect(() => {

    const savedVendors = JSON.parse(localStorage.getItem("vendors")) || [];
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setVendors(savedVendors);
    setProducts(savedProducts);
    setOrders(savedOrders);

  }, []);

  // SAVE VENDORS
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ADD VENDOR
  const addVendor = () => {

    if (
      !formData.name ||
      !formData.shop ||
      !formData.product ||
      !formData.price ||
      !formData.username ||
      !formData.password
    ) {
      alert("Please fill all fields!");
      return;
    }

    const newVendor = { ...formData };

    setVendors([...vendors, newVendor]);

    setFormData({
      name: "",
      shop: "",
      product: "",
      price: "",
      username: "",
      password: "",
      approved: false
    });

    setShowVendorModal(false);
  };

  // APPROVE VENDOR
  const approveVendor = (index) => {
    const updated = [...vendors];
    updated[index].approved = true;
    setVendors(updated);
  };

  // DELETE VENDOR
  const deleteVendor = (index) => {
    const updated = vendors.filter((v, i) => i !== index);
    setVendors(updated);
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {

    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const updatedProducts = products.filter(p => p.id !== id);

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

  };

  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (

    <div style={{ minHeight: "100vh", background: lightPink }}>

      <Container fluid>

        <Row>

          {/* Sidebar */}

          <Col md={3} style={{
            background: `linear-gradient(180deg,#F8BBD0,${rosePink})`,
            minHeight: "100vh",
            color: "white",
            padding: "30px"
          }}>

            <h4 style={{ fontWeight: "bold", marginBottom: "40px" }}>
              She Empire Admin
            </h4>

            <Nav className="flex-column">

              <Nav.Link
                style={{ color: "white", marginBottom: "10px", cursor: "pointer" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                📊 Dashboard
              </Nav.Link>

              <Nav.Link
                style={{ color: "white", marginBottom: "10px", cursor: "pointer" }}
                onClick={() => setShowVendorModal(true)}
              >
                🏪 Add Vendor
              </Nav.Link>

              <Nav.Link
                style={{ color: "white", marginBottom: "10px", cursor: "pointer" }}
                onClick={() => productsRef.current.scrollIntoView({ behavior: "smooth" })}
              >
                🛍 Products
              </Nav.Link>

              <Nav.Link
                style={{ color: "white", marginBottom: "10px", cursor: "pointer" }}
                onClick={() => ordersRef.current.scrollIntoView({ behavior: "smooth" })}
              >
                📦 Orders
              </Nav.Link>

            </Nav>

            <Button
              variant="light"
              style={{ marginTop: "40px", width: "100%" }}
              onClick={logout}
            >
              Logout
            </Button>

          </Col>

          {/* Main Content */}

          <Col md={9} style={{ padding: "40px" }}>

            <h2 style={{ color: rosePink, fontWeight: "bold", marginBottom: "30px" }}>
              Admin Dashboard 👩‍💻
            </h2>

            {/* Dashboard Cards */}

            <Row className="mb-4">

              <Col md={4}>
                <Card style={{ textAlign: "center", padding: "25px", borderRadius: "20px" }}>
                  <h5>Total Vendors</h5>
                  <h3>{vendors.length}</h3>
                </Card>
              </Col>

              <Col md={4}>
                <Card style={{ textAlign: "center", padding: "25px", borderRadius: "20px" }}>
                  <h5>Total Products</h5>
                  <h3>{totalProducts}</h3>
                </Card>
              </Col>

              <Col md={4}>
                <Card style={{ textAlign: "center", padding: "25px", borderRadius: "20px" }}>
                  <h5>Total Orders</h5>
                  <h3>{totalOrders}</h3>
                </Card>
              </Col>

            </Row>

            {/* Vendor List */}

            <h4 className="mt-5">Vendor List</h4>

            <Table bordered hover responsive>

              <thead style={{ backgroundColor: rosePink, color: "#fff" }}>
                <tr>
                  <th>Name</th>
                  <th>Shop</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {vendors.length === 0 ? (

                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: roseGold }}>
                      No vendors added yet
                    </td>
                  </tr>

                ) : (

                  vendors.map((v, index) => (

                    <tr key={index}>

                      <td>{v.name}</td>
                      <td>{v.shop}</td>
                      <td>{v.product}</td>
                      <td>{v.price}</td>
                      <td>{v.username}</td>

                      <td style={{ color: v.approved ? "green" : roseGold }}>
                        {v.approved ? "Approved" : "Pending"}
                      </td>

                      <td>

                        {!v.approved && (
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => approveVendor(index)}
                          >
                            Approve
                          </Button>
                        )}

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteVendor(index)}
                        >
                          Delete
                        </Button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </Table>

            {/* Product List */}

            <div ref={productsRef}>

              <h4 className="mt-5">Product List</h4>

              <Table bordered hover responsive>

                <thead style={{ backgroundColor: rosePink, color: "#fff" }}>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {products.length === 0 ? (

                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        No products available
                      </td>
                    </tr>

                  ) : (

                    products.map((p) => (

                      <tr key={p.id}>

                        <td>{p.name}</td>
                        <td>₹{p.price}</td>

                        <td>
                          <img src={p.image} width="60" alt="" />
                        </td>

                        <td>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteProduct(p.id)}
                          >
                            Delete
                          </Button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </Table>

            </div>

            {/* Orders */}

            <div ref={ordersRef}>

              <h4 className="mt-5">Customer Orders</h4>

              <Table bordered hover responsive>

                <thead style={{ backgroundColor: rosePink, color: "#fff" }}>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.length === 0 ? (

                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No orders placed yet
                      </td>
                    </tr>

                  ) : (

                    orders.map((o) => (

                      <tr key={o.id}>

                        <td>{o.id}</td>

                        <td>
                          {o.items?.map(i => i.name).join(", ")}
                        </td>

                        <td>{o.customer}</td>

                        <td>{o.phone}</td>

                        <td>{o.address}</td>

                        <td>{o.status}</td>

                      </tr>

                    ))

                  )}

                </tbody>

              </Table>

            </div>

          </Col>

        </Row>

      </Container>

      {/* Add Vendor Modal */}

      <Modal show={showVendorModal} onHide={() => setShowVendorModal(false)} centered>

        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form>

            <Form.Control className="mb-2" name="name" placeholder="Vendor Name" value={formData.name} onChange={handleChange} />
            <Form.Control className="mb-2" name="shop" placeholder="Shop Name" value={formData.shop} onChange={handleChange} />
            <Form.Control className="mb-2" name="product" placeholder="Product" value={formData.product} onChange={handleChange} />
            <Form.Control className="mb-2" name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} />
            <Form.Control className="mb-2" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <Form.Control className="mb-2" name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />

          </Form>

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={() => setShowVendorModal(false)}>
            Cancel
          </Button>

          <Button variant="primary" onClick={addVendor}>
            Add Vendor
          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  );
}

export default Dashboard;