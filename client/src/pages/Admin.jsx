import { useState } from "react";
import { motion } from "framer-motion";
import AdminAuth from "./../auth/AdminAuth";
import MovieManagement from "../components/movie/MovieManagement";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MovieManagement onLogout={handleLogout} />
          <div className="w-full mb-10">
            <motion.video
              autoPlay
              loop
              muted
              src="kid-goku.mp4"
              className="w-full h-full object-fill rounded-3xl cursor-pointer"
              aria-label="Booking header video"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdminAuth onLoginSuccess={handleLoginSuccess} />
        </motion.div>
      )}
    </div>
  );
};

export default Admin;
