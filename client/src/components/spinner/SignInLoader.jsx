import { Spinner } from "flowbite-react";

const SignInLoader = () => {
  return (
    <div className="w-full p-4 container mx-auto flex flex-col items-center space-y-4">
      <Spinner color="purple" size="xl" className="w-20 h-20" />
      <div className="flex flex-col text-center">
        <p className="dark:text-gray-200">
          🔒 Hang tight, we’re securing your spot in the digital world...
        </p>
      </div>
    </div>
  );
};

export default SignInLoader;
