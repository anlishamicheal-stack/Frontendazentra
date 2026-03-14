import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

function CustomNavbar() {

  const { cartCount } = useContext(CartContext);
  const [animateCart, setAnimateCart] = useState(false);

  // Trigger animation when cartCount changes
  useEffect(() => {

    if (cartCount > 0) {
      setAnimateCart(true);

      setTimeout(() => {
        setAnimateCart(false);
      }, 600);
    }

  }, [cartCount]);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Cart 🛒", path: "/cart", badge: cartCount },
    { title: "Track Orders 📦", path: "/track-order" },
  ];

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(to right, #f8bbd0, #fce4ec)",
        padding: "12px 0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}
      fixed="top"
    >
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bold",
            fontSize: "24px",
            color: "#AD1457",
          }}
        >
          She Empire 💖
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">

            {navItems.map((item, idx) => (

              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  item.title.includes("Cart") && animateCart
                    ? { y: [0, -8, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
                style={{ display: "inline-block", marginLeft: "15px" }}
              >

                <Nav.Link
                  as={Link}
                  to={item.path}
                  style={{
                    fontWeight: "600",
                    color: "#880E4F",
                    fontSize: "16px",
                    position: "relative",
                  }}
                >
                  {item.title}

                  {item.badge > 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Badge
                        bg="warning"
                        text="dark"
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-12px",
                          fontSize: "12px",
                        }}
                      >
                        {item.badge}
                      </Badge>
                    </motion.div>
                  )}

                </Nav.Link>

              </motion.div>

            ))}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default CustomNavbar;