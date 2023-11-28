import React from "react";

// The code provided defines a functional component called Spinner.
// Functional components are a simpler way to write React components compared to class components.
// The Spinner component returns JSX code that represents the visual appearance of the spinner

function Spinner() {
  return (
    <div className="fixed inset-0 bg-black opacity-70 flex items-center justify-center z-[9999]">
      <div className="h-10 w-10 border-4 border-gray-200 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
