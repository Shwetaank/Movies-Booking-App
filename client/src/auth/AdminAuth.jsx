import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, TextInput, Label, Toast } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from "framer-motion";

const AdminAuth = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", response.data.token);

      // Show toast message and delay navigation to allow the toast to display
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onLoginSuccess();
        navigate("/admin");
      }, 1500); // 1.5 second delay to show toast before navigation
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(
          err.response.data.message || "Login failed, please try again."
        );
      } else if (err.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center p-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md p-10 shadow-xl rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-semibold text-center text-purple-700 dark:text-purple-200 mb-6">
          Admin Panel Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label
              htmlFor="adminEmail"
              value="Admin Email :-"
              color="success"
              className="block text-sm font-bold mb-2"
            />
            <TextInput
              id="adminEmail"
              type="email"
              icon={HiMail}
              placeholder="shwetank@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              color="success"
              shadow
              className="pl-1" 
            />
          </div>

          <div>
            <Label
              htmlFor="adminPassword"
              value="Password :-"
              color="success"
              className="block text-sm font-bold mb-2"
            />
            <TextInput
              id="adminPassword"
              type="password"
              icon={RiLockPasswordFill}
              placeholder="shwet@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
              color="success"
              className="pl-1" 
            />
          </div>

          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            className="w-full p-2 font-extrabold transition-transform transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Log In"}
          </Button>
        </form>

        {/* Display Toast when login is successful */}
        {showToast && (
          <div className="absolute top-5 right-5">
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
                🎉
              </div>
              <div className="ml-3 text-sm font-normal">
                Welcome back, Admin!
              </div>
              <Toast.Toggle />
            </Toast>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

AdminAuth.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default AdminAuth;
