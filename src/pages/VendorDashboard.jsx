// src/pages/VendorDashboard.jsx
import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Table } from "react-bootstrap";

const luxuryPink = "#EC407A";

export default function VendorDashboard() {

  const vendor = JSON.parse(localStorage.getItem("vendor"));
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  // Load vendor products
  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(allProducts.filter(p => p.vendorUsername === vendor.username));
  }, []);

  // ADD PRODUCT
  const addProduct = () => {

    if (!form.name || !form.price || !form.image) {
      alert("Please fill all fields");
      return;
    }

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
      id: Date.now(),   // important for product page
      name: form.name,
      price: form.price,
      image: form.image,
      vendorUsername: vendor.username
    };

    allProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(allProducts));

    setProducts(prev => [...prev, newProduct]);

    setForm({ name: "", price: "", image: "" });

    window.dispatchEvent(new Event("productsUpdated"));

    alert("Product added successfully!");
  };

  // DELETE PRODUCT
  const deleteProduct = (id) => {

    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = allProducts.filter(p => p.id !== id);

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProducts(products.filter(p => p.id !== id));

    window.dispatchEvent(new Event("productsUpdated"));
  };

  return (

    <Container style={{ paddingTop: "50px" }}>

      <h2 style={{ color: luxuryPink }}>
        Welcome, {vendor.username}
      </h2>

      {/* ADD PRODUCT */}

      <Card
        style={{
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "15px",
          boxShadow: `0 5px 15px ${luxuryPink}33`
        }}
      >

        <h4 style={{ color: luxuryPink }}>Add Product</h4>

        <Form>

          <Form.Group className="mb-2">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter product name"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              placeholder="Enter image URL"
            />
          </Form.Group>

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              style={{
                width: "120px",
                marginTop: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
          )}

          <Button
            style={{
              backgroundColor: luxuryPink,
              border: "none",
              marginTop: "10px"
            }}
            onClick={addProduct}
          >
            Add Product
          </Button>

        </Form>

      </Card>

      {/* PRODUCT LIST */}

      <h4 style={{ color: luxuryPink }}>Your Products</h4>

      {products.length === 0 ? (

        <p>No products added yet.</p>

      ) : (

        <Table striped bordered hover>

          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map(p => (

              <tr key={p.id}>

                <td>{p.name}</td>

                <td>₹{p.price}</td>

                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "80px", borderRadius: "5px" }}
                  />
                </td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </Button>
                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      )}

    </Container>
  );
}    