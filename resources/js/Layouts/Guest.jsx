import React from "react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center px-4 bg-gray-100">
      <div className="w-full rounded-lg max-w-sm mt-6 px-6 py-8 bg-white shadow-md overflow-hidden">
        {children}
      </div>
    </div>
  );
}
