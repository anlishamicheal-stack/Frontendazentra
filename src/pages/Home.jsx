// src/pages/Home.jsx
import { Container, Row, Col, Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const blushPink = "#FFF0F6";
const rosePink = "#E91E63";
const gold = "#FFD700";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts && Array.isArray(storedProducts)) {
      setProducts(storedProducts);
    } else {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search !== "") {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setSuggestions(filtered.slice(0, 5));
  }, [search, category, products]);

  const filteredProducts = products.filter((product) => {
    const matchName = product?.name?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "All" ||
      product?.category?.toLowerCase() === category.toLowerCase();
    return matchName && matchCategory;
  });

  return (
    <div style={{ backgroundColor: blushPink, paddingTop: "90px" }}>

      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage: `url("https://getwallpapers.com/wallpaper/full/2/3/2/101538.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 20px",
          textAlign: "center",
          position: "relative",
          color: "white",
        }}
      >

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1 }}
        >

          <h1 style={{ fontSize: "65px", fontWeight: "700" }}>
            She Empire 💖
          </h1>

          <p style={{ fontSize: "22px", marginBottom: "30px" }}>
            Luxury Marketplace for Women Entrepreneurs
          </p>

          {/* SEARCH BAR */}
          <Container style={{ maxWidth: "600px", position: "relative" }}>
            <InputGroup>

              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ maxWidth: "150px" }}
              >
                <option>All</option>
                <option>Saree</option>
                <option>Jewellery</option>
                <option>Beauty</option>
              </Form.Select>

              <Form.Control
                placeholder="Search luxury products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                onClick={() =>
                  navigate(`/products?search=${search}&category=${category}`)
                }
                style={{
                  background: `linear-gradient(45deg, ${rosePink}, ${gold})`,
                  border: "none",
                }}
              >
                Search 🔍
              </Button>

            </InputGroup>

            {/* AUTO SUGGESTIONS */}
            {search && suggestions.length > 0 && (
              <ListGroup
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: 1000,
                }}
              >
                {suggestions.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Container>

        </motion.div>
      </div>

      {/* CATEGORY SECTION */}
      <Container style={{ marginTop: "70px" }}>
        <Row>
          {[
            { title: "Beauty 💄", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" },
            { title: "Fashion 👗", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d" },
            { title: "Jewellery 💎", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
            { title: "Handmade 🧵", img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0" }
          ].map((cat, index) => (
            <Col md={3} key={index} className="mb-4">
              <motion.div whileHover={{ scale: 1.07 }}>
                <Card
                  onClick={() => setCategory(cat.title.split(" ")[0])}
                  style={{
                    border: "none",
                    borderRadius: "25px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 15px 35px rgba(233,30,99,0.2)",
                  }}
                >
                  <Card.Img
                    src={cat.img}
                    style={{ height: "210px", objectFit: "cover" }}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title style={{ color: rosePink }}>
                      {cat.title}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* TRENDING PRODUCTS */}
      <Container style={{ marginTop: "80px", marginBottom: "100px" }}>
        <h2 style={{ textAlign: "center", color: rosePink, marginBottom: "50px" }}>
          Trending Products 🔥
        </h2>

        <Row>
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found</p>
          ) : (
            filteredProducts.slice(0, 8).map((product, index) => (
              <Col md={3} key={index} className="mb-4">
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Card
                    style={{
                      border: "none",
                      borderRadius: "25px",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Card.Img
                      src={product?.image || "https://via.placeholder.com/300"}
                      style={{ height: "230px", objectFit: "cover" }}
                    />

                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title style={{ color: rosePink }}>
                        {product?.name}
                      </Card.Title>

                      <p style={{ fontWeight: "700" }}>
                        ₹{product?.price}
                      </p>

                      <Button
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{
                          background: `linear-gradient(45deg, ${rosePink}, ${gold})`,
                          border: "none",
                          borderRadius: "30px",
                        }}
                      >
                        View Product
                      </Button>

                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* FOOTER */}
      <div
        style={{
          background: "linear-gradient(to right,#F8BBD0,#E91E63)",
          color: "white",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h4>She Empire 💖</h4>
        <p>Luxury Marketplace for Women Entrepreneurs</p>
        <p style={{ fontSize: "14px" }}>© 2026 She Empire</p>
      </div>

    </div>
  );
}

export default Home;