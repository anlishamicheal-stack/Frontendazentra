// src/pages/TrackOrder.jsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function TrackOrder() {
  const [orders, setOrders] = useState([]);

  // Load orders and remove deleted products
  useEffect(() => {

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // keep only items that still exist in products
    const updatedOrders = savedOrders.map((order) => {

      const validItems = order.items.filter((item) =>
        products.some((p) => p.id === item.id)
      );

      return {
        ...order,
        items: validItems
      };

    }).filter(order => order.items.length > 0); // remove order if no items left

    setOrders(updatedOrders.reverse());

    // update localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

  }, []);

  // Helper to format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container style={{ paddingTop: "120px", paddingBottom: "50px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Orders 📦
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No orders yet. Place an order first!
        </p>
      ) : (
        orders.map((order) => (
          <Card
            key={order.id}
            style={{
              marginBottom: "25px",
              padding: "15px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              borderRadius: "15px",
              background: "#FFF0F6",
            }}
          >
            <h5 style={{ marginBottom: "10px" }}>
              Order ID: {order.id}{" "}
              <Badge
                bg={order.status === "Processing" ? "warning" : "success"}
                style={{ fontSize: "14px" }}
              >
                {order.status}
              </Badge>
            </h5>

            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
            <p><strong>Expected Delivery:</strong> {formatDate(order.deliveryDate)}</p>

            <Row>
              {order.items.map((item, idx) => (
                <Col md={3} key={idx} className="mb-3">
                  <Card>
                    <Card.Img
                      src={item.image}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title>{item.name}</Card.Title>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity || 1}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

          </Card>
        ))
      )}
    </Container>
  );
}

export default TrackOrder;