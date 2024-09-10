import PropTypes from 'prop-types';
import { Spinner } from 'flowbite-react';

const LoadingError = ({ loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="w-full p-4 container mx-auto flex flex-col items-center space-y-4">
        <Spinner color="purple" size="xl" className="w-20 h-20" />
        <div className="flex flex-col text-center">
          <p className="dark:text-gray-200">
            🔄 Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 container mx-auto flex flex-col items-center space-y-4">
        <div className="flex flex-col text-center">
          <p className="text-red-500">
            🚫 {error}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

LoadingError.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default LoadingError;
