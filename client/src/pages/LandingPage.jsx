import { UserButton } from "@clerk/clerk-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const LandingPage = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow w-full max-w-7xl p-2 mx-auto my-8">
        <UserButton />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
