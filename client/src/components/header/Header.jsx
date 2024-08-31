import { DarkThemeToggle } from "flowbite-react";

const Header = () => {
  return (
    <header className="w-full p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Website</h1>
        <DarkThemeToggle />
      </div>
    </header>
  );
};

export default Header;
