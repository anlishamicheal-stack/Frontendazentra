import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

const luxuryPink = "#EC407A";
const blushPink = "#FFF5F8";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Get addToCart from context
  const { addToCart } = useContext(CartContext);

  // Load products
  useEffect(() => {

    const loadProducts = () => {
      const allProducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(allProducts);
    };

    loadProducts();
    window.addEventListener("productsUpdated", loadProducts);

    return () =>
      window.removeEventListener("productsUpdated", loadProducts);

  }, []);

  return (
    <Container
      style={{
        padding: "80px 20px",
        minHeight: "100vh",
        background: blushPink
      }}
    >

      <h2
        style={{
          color: luxuryPink,
          marginBottom: "30px",
          textAlign: "center"
        }}
      >
        Our Products
      </h2>

      {products.length === 0 ? (

        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#555"
          }}
        >
          No products available yet.
        </p>

      ) : (

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">

          {products.map((p) => (

            <Col key={p.id}>

              <Card
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s"
                }}
                className="h-100 product-card"
              >

                <div style={{ overflow: "hidden", height: "180px" }}>
                  <Card.Img
                    variant="top"
                    src={p.image || "https://via.placeholder.com/220x180?text=No+Image"}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      transition: "transform 0.3s"
                    }}
                    className="product-img"
                  />
                </div>

                <Card.Body style={{ textAlign: "center" }}>

                  <Card.Title
                    style={{
                      fontSize: "18px",
                      fontWeight: "600"
                    }}
                  >
                    {p.name}
                  </Card.Title>

                  <Card.Text
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: luxuryPink
                    }}
                  >
                    ₹{p.price}
                  </Card.Text>

                  {/* View Product Button */}
                  <Button
                    style={{
                      backgroundColor: "#333",
                      border: "none",
                      width: "100%",
                      borderRadius: "25px",
                      marginBottom: "10px"
                    }}
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    View Product
                  </Button>

                  {/* Add to Cart Button ✅ */}
                  <Button
                    style={{
                      backgroundColor: luxuryPink,
                      border: "none",
                      width: "100%",
                      borderRadius: "25px"
                    }}
                    onClick={() => {
                      addToCart(p); // ✅ Use context
                      alert(p.name + " added to cart!");
                    }}
                  >
                    Add to Cart
                  </Button>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

      )}

      {/* Hover effect */}
      <style>
        {`
          .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.25);
          }

          .product-img:hover {
            transform: scale(1.05);
          }
        `}
      </style>

    </Container>
  );
}