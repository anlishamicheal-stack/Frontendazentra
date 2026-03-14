 import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const hotPink = "#FF4F81";
const cream = "#FFF5F7";

function Checkout() {

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setStep(2);
  };

  const placeOrder = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customer: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
      status: "Processing",
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 3 * 86400000).toISOString()
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    alert("Payment Successful 💖 Order Placed!");

    setStep(4);
  };

  return (
    <div style={{ backgroundColor: cream, minHeight: "100vh", paddingTop: "100px" }}>
      <Container style={{ maxWidth: "500px" }}>

        <h2 style={{ color: hotPink, marginBottom: "20px" }}>
          Checkout 💳
        </h2>

        {step === 1 && (
          <Form onSubmit={handleAddressSubmit}>

            <Form.Group className="mb-3">
              <Form.Control
                placeholder="First Name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Address"
                required
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Phone Number"
                required
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Form.Group>

            <Button
              type="submit"
              style={{
                backgroundColor: hotPink,
                border: "none",
                width: "100%",
                borderRadius: "25px"
              }}
            >
              Proceed to Pay
            </Button>

          </Form>
        )}

        {step === 2 && (
          <Card style={{ padding: "20px", border: "none" }}>

            <h5>Select Payment Method</h5>

            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="payment"
              onChange={() => setPaymentMethod("COD")}
            />

            <Form.Check
              type="radio"
              label="Google Pay"
              name="payment"
              onChange={() => setPaymentMethod("GPay")}
            />

            <Button
              style={{
                backgroundColor: hotPink,
                border: "none",
                width: "100%",
                borderRadius: "25px",
                marginTop: "15px"
              }}
              onClick={() => setStep(3)}
              disabled={!paymentMethod}
            >
              Continue
            </Button>

          </Card>
        )}

        {step === 3 && (
          <Card style={{ padding: "20px", border: "none", textAlign: "center" }}>

            {paymentMethod === "COD" && (
              <>
                <h5>Cash on Delivery</h5>
                <p>You will pay when the order arrives.</p>
              </>
            )}

            {paymentMethod === "GPay" && (
              <>
                <h5>Scan with Google Pay</h5>

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
                  alt="GPay QR"
                  style={{ margin: "20px" }}
                />

                <p>Scan this QR code using Google Pay.</p>
              </>
            )}

            <Button
              style={{
                backgroundColor: hotPink,
                border: "none",
                width: "100%",
                borderRadius: "25px"
              }}
              onClick={placeOrder}
            >
              Payment Done
            </Button>

          </Card>
        )}

        {step === 4 && (
          <Card style={{ padding: "20px", border: "none", textAlign: "center" }}>
            <h3>🎉 Order Successful</h3>
            <p>Thank you for shopping with She Empire!</p>
          </Card>
        )}

      </Container>
    </div>
  );
}

export default Checkout;