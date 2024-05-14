const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="p-5 rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-600 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.42 0-4.533-.87-6-2.709z"
            ></path>
          </svg>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
