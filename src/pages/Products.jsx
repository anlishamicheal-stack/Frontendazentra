import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import Notification from "../components/Notification";
import { useLocation } from "react-router-dom";

const roseGold = "#AD1457";
const blushPink = "#FCE4EC";

function Products() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const location = useLocation();

  const userRole = localStorage.getItem("role");

  useEffect(() => {

    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    storedProducts = storedProducts.map((p) => ({
      ...p,
      id: p.id || Date.now() + Math.random()
    }));

    setProducts(storedProducts);

    const query = new URLSearchParams(location.search);

    const search = query.get("search") || "";
    const cat = query.get("category") || "All";

    setSearchTerm(search);
    setCategory(cat);

  }, [location.search]);

  const filteredProducts = products.filter((p) => {

    const matchCategory =
      category === "All" || p.category === category;

    const matchSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;

  });

  // ✅ FIXED ADD TO CART
  const handleAddToCart = (product) => {

    const item = {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1
    };

    addToCart(item);

    setToastMessage(`${product.name} added to cart!`);
    setToast(true);
  };

  // ADMIN DELETE
  const deleteProduct = (id) => {

    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const updatedProducts = products.filter((p) => p.id !== id);

    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setToastMessage("Product deleted successfully");
    setToast(true);
  };

  return (

    <div
      style={{
        backgroundColor: blushPink,
        paddingTop: "120px",
        paddingBottom: "100px"
      }}
    >

      <Container>

        <h1
          style={{
            textAlign: "center",
            color: roseGold,
            fontWeight: "700",
            marginBottom: "40px"
          }}
        >
          Our Premium Collection ✨
        </h1>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>

          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              maxWidth: "250px",
              margin: "0 auto",
              borderRadius: "30px",
              padding: "10px"
            }}
          >
            <option value="All">All Categories</option>
            <option value="Saree">Saree</option>
            <option value="Beauty">Beauty</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Fashion">Fashion</option>
            <option value="Handmade">Handmade</option>
          </Form.Select>

        </div>

        <Row>

          {filteredProducts.length === 0 ? (

            <p style={{ textAlign: "center" }}>
              No products found
            </p>

          ) : (

            filteredProducts.map((product) => (

              <Col md={3} key={product.id} className="mb-4">

                <motion.div whileHover={{ scale: 1.05 }}>

                  <Card
                    style={{
                      border: "none",
                      borderRadius: "25px",
                      boxShadow: "0 15px 35px rgba(173,20,87,0.15)"
                    }}
                  >

                    <Card.Img
                      variant="top"
                      src={product.image || "https://via.placeholder.com/300"}
                      style={{
                        height: "250px",
                        objectFit: "cover"
                      }}
                    />

                    <Card.Body style={{ textAlign: "center" }}>

                      <Card.Title
                        style={{
                          color: roseGold,
                          fontWeight: "600"
                        }}
                      >
                        {product.name}
                      </Card.Title>

                      <p>₹{product.price}</p>

                      <Button
                        style={{
                          background:
                            "linear-gradient(45deg, #EC407A, #FFD700)",
                          border: "none",
                          borderRadius: "30px",
                          marginBottom: "10px",
                          width: "100%"
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart 🛍
                      </Button>

                      {userRole === "admin" && (
                        <Button
                          variant="danger"
                          style={{
                            width: "100%",
                            borderRadius: "30px"
                          }}
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete Product 🗑
                        </Button>
                      )}

                    </Card.Body>

                  </Card>

                </motion.div>

              </Col>

            ))

          )}

        </Row>

      </Container>

      <Notification
        show={toast}
        message={toastMessage}
        onClose={() => setToast(false)}
      />

    </div>

  );
}

export default Products;