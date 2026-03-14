// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role"); // 'vendor', 'admin', or null

  if (!role) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but role not allowed → redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  // User is authorized
  return children;
}

export default ProtectedRoute;