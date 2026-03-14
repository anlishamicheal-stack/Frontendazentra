// src/pages/Cart.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

const luxuryPink = "#EC407A";

function Cart() {

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  // Load cart
  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ensure every item has quantity
    const fixedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1
    }));

    setCart(fixedCart);

    localStorage.setItem("cart", JSON.stringify(fixedCart));

  }, []);

  // Update quantity
  const updateQuantity = (index, quantity) => {

    if (quantity < 1) return;

    const updatedCart = [...cart];

    updatedCart[index].quantity = quantity;

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove product
  const removeFromCart = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setToastMessage("Product removed from cart");
    setToast(true);
  };

  // Clear cart
  const clearCart = () => {

    setCart([]);

    localStorage.removeItem("cart");

    setToastMessage("Cart cleared");
    setToast(true);
  };

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container style={{ paddingTop: "120px", paddingBottom: "50px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Cart 🛒
      </h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      ) : (
        <>
          <Row>

            {cart.map((item, index) => (

              <Col md={3} key={index} className="mb-4">

                <Card style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>

                  {item.image && (
                    <Card.Img
                      src={item.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}

                  <Card.Body style={{ textAlign: "center" }}>

                    <Card.Title>{item.name}</Card.Title>

                    <p style={{ color: luxuryPink, fontWeight: "600" }}>
                      ₹{item.price}
                    </p>

                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, Number(e.target.value))
                      }
                      style={{ marginBottom: "10px" }}
                    />

                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </Button>

                  </Card.Body>

                </Card>

              </Col>

            ))}

          </Row>

          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            Total: ₹{total}
          </h3>

          <div style={{ textAlign: "center", marginTop: "20px" }}>

            <Button
              variant="secondary"
              onClick={clearCart}
              style={{ marginRight: "10px" }}
            >
              Clear Cart
            </Button>

            <Button
              style={{
                backgroundColor: luxuryPink,
                border: "none",
                borderRadius: "25px",
                padding: "10px 25px"
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout 💳
            </Button>

          </div>
        </>
      )}

      <Notification
        show={toast}
        message={toastMessage}
        onClose={() => setToast(false)}
      />

    </Container>
  );
}

export default Cart;