import { useUser, UserButton } from "@clerk/clerk-react";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useUser();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900 rounded-lg px-2 py-1 font-bold cursor-pointer"
      : "text-gray-900 dark:text-white font-bold cursor-pointer";
  };

  return (
    <Navbar
      fluid
      rounded
      className="w-screen px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl mx-auto bg-white dark:bg-gray-800 shadow-md"
    >
      <Navbar.Brand onClick={() => navigate("/")}>
        <motion.img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9 cursor-pointer"
          alt="Logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
      </Navbar.Brand>
      <div className="flex items-center gap-2 md:gap-6 md:order-2">
        {!isSignedIn ? (
          <>
            <Button
              outline
              gradientDuoTone="purpleToPink"
              onClick={() => navigate("/auth/sign-in")}
            >
              Get started
            </Button>
            <DarkThemeToggle />
          </>
        ) : (
          <>
            <motion.div
              className="hidden md:flex md:justify-end md:items-center md:gap-6 xl:gap-10 list-none"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Navbar.Link
                  active={location.pathname === "/home"}
                  onClick={() => navigate("/home")}
                  className={getLinkClass("/home")}
                >
                  Bookings
                </Navbar.Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Navbar.Link
                  active={location.pathname === "/admin"}
                  onClick={() => navigate("/admin")}
                  className={getLinkClass("/admin")}
                >
                  Admin Panel
                </Navbar.Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Navbar.Link
                  active={location.pathname === "/about-me"}
                  onClick={() => navigate("/about-me")}
                  className={getLinkClass("/about-me")}
                >
                  About Me
                </Navbar.Link>
              </motion.div>
              <UserButton />
              <DarkThemeToggle />
            </motion.div>
            <div className="md:hidden flex gap-4 items-center">
              <UserButton />
              <DarkThemeToggle />
              <Navbar.Toggle />
            </div>
          </>
        )}
      </div>
      {isSignedIn && (
        <Navbar.Collapse className="md:hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar.Link
              active={location.pathname === "/home"}
              onClick={() => navigate("/home")}
              className={getLinkClass("/home")}
            >
              Bookings
            </Navbar.Link>
            <Navbar.Link
              active={location.pathname === "/admin"}
              onClick={() => navigate("/admin")}
              className={getLinkClass("/admin")}
            >
              Admin Panel
            </Navbar.Link>
            <Navbar.Link
              active={location.pathname === "/about-me"}
              onClick={() => navigate("/about-me")}
              className={getLinkClass("/about-me")}
            >
              About Me
            </Navbar.Link>
          </motion.div>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Header;
