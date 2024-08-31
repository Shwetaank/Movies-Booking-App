import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useUser } from "@clerk/clerk-react";
import SignInLoader from "./components/spinner/SignInLoader";

const App = () => {
  const { isLoaded, isSignedIn } = useUser();

  // Display a loading state while the authentication status is being loaded
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignInLoader />
      </div>
    );
  }

  // Redirect to sign-in page if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
