import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CustomNavbar from "./components/CustomNavbar";

// Customer Pages
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import TrackOrder from "./pages/TrackOrder";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import VendorList from "./pages/admin/VendorList";

// Vendor Pages
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";

function Layout() {
  const location = useLocation();

  // Hide navbar on admin/vendor pages
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/vendor");

  return (
    <>
      {!hideNavbar && <CustomNavbar />} {/* Navbar will show cart count */}
      <Routes>
        {/* Customer Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track-order" element={<TrackOrder />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/vendors" element={<VendorList />} />

        {/* Vendor Pages */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Fallback Page */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;