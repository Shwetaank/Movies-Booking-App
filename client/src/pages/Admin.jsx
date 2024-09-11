import { useState } from "react";
import AdminAuth from "./../auth/AdminAuth";
import AdminMovieForm from "../components/forms/AdminMovieForm";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("adminToken")
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <AdminMovieForm onLogout={handleLogout} />
      ) : (
        <AdminAuth onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Admin;
