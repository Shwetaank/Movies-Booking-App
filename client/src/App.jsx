import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
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
