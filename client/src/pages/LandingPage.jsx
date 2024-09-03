import { UserButton } from "@clerk/clerk-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const LandingPage = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48  ">
        <UserButton />
        hi my name is Shwetank
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
