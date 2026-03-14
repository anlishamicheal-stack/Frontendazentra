import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    // Fix ID matching
    const foundProduct = storedProducts.find(
      (p) => String(p.id) === String(id)
    );

    setProduct(foundProduct);

    const savedReviews =
      JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];

    setReviews(savedReviews);

  }, [id]);

  const addReview = () => {

    if (!reviewText.trim()) return;

    const newReviews = [...reviews, reviewText];

    setReviews(newReviews);

    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(newReviews)
    );

    setReviewText("");

  };

  const handleAddToCart = () => {

    if (!product) return;

    addToCart({
      ...product,
      quantity: quantity
    });

    alert("Product added to cart!");

  };

  if (!product) {

    return (
      <Container style={{ marginTop: "120px", textAlign: "center" }}>
        <h3>Product not found</h3>
      </Container>
    );

  }

  return (

    <Container style={{ marginTop: "120px" }}>

      <Row>

        {/* Product Image */}

        <Col md={6}>

          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "15px"
            }}
          />

        </Col>

        {/* Product Details */}

        <Col md={6}>

          <h2>{product.name}</h2>

          <h4 style={{ color: "#E91E63" }}>
            ₹{product.price}
          </h4>

          <p>{product.description || "No description available"}</p>

          {/* Quantity */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >

            <Button
              variant="secondary"
              onClick={() =>
                quantity > 1 && setQuantity(quantity - 1)
              }
            >
              -
            </Button>

            <Form.Control
              value={quantity}
              style={{
                width: "60px",
                textAlign: "center",
                margin: "0 10px"
              }}
              readOnly
            />

            <Button
              variant="secondary"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>

          </div>

          {/* Add To Cart */}

          <Button
            onClick={handleAddToCart}
            style={{
              background:
                "linear-gradient(45deg,#E91E63,#FFD700)",
              border: "none",
              borderRadius: "30px",
              padding: "10px 30px"
            }}
          >
            Add to Cart 🛒
          </Button>

          <hr />

          {/* Reviews */}

          <h4>Customer Reviews</h4>

          <Form.Control
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
          />

          <Button
            onClick={addReview}
            className="mt-2"
          >
            Submit Review
          </Button>

          <div className="mt-3">

            {reviews.length === 0 && (
              <p>No reviews yet</p>
            )}

            {reviews.map((r, i) => (
              <p key={i}>⭐ {r}</p>
            ))}

          </div>

        </Col>

      </Row>

    </Container>

  );

}

export default ProductDetail;