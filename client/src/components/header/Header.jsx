import { useUser, UserButton } from "@clerk/clerk-react";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";

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
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9 cursor-pointer"
          alt="Logo"
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
            <div className="hidden md:flex md:justify-end md:items-center md:gap-6 xl:gap-10 list-none">
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
              <UserButton />
              <DarkThemeToggle />
            </div>
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
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Header;
