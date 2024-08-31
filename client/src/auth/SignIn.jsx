import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";

const SignIn = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <ClerkSignIn />
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
