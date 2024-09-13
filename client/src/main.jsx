import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import Admin from "./pages/Admin.jsx";
import SignIn from "./auth/SignIn.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Flowbite } from "flowbite-react";

// Routing setup
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about-me",
        element: <AboutMe />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
]);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="w-screen min-h-screen  flex flex-col  bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Flowbite>
          <RouterProvider router={router} />
        </Flowbite>
      </div>
    </ClerkProvider>
  </StrictMode>
);
