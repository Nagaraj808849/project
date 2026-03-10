import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "../Login/Login";
import Signup from "../Login/Signup";
import Frontpage from "../Home/Frontpage";
import TableOrder from "../TableOrder/TableOrdering.jsx";
import PaymentPage from "../Payment/PaymentDetails.jsx";
import UserDash from "../UserDash/UserDash.jsx";
import Admin from "../AbminDash/Admin.jsx";
import Homepage1 from "../Home/HomePage1.jsx";
import Menu1 from "../Menu/Menu1.jsx";
import CartPage from "../Menu/Cartpage.jsx";
import { AuthProvider } from "./context/AuthContext";


// 🔹 Embedded ProtectedRoute
const ProtectedRoute = ({ children, requireAdmin = false }) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // Admin route protection
  if (requireAdmin && Number(role) !== 1) {
    return <Navigate to="/Homepage1" />;
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <Router>

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Frontpage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Homepage1" element={<Homepage1 />} />

          {/* Protected User Routes */}

          <Route
            path="/Menu1"
            element={
              <ProtectedRoute>
                <Menu1 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/TableOrder"
            element={
              <ProtectedRoute>
                <TableOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/PaymentDetails"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/UserDash"
            element={
              <ProtectedRoute>
                <UserDash />
              </ProtectedRoute>
            }
          />

          {/* 🔴 ADMIN ONLY ROUTE */}

          <Route
            path="/Admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;