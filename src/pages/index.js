import React from "react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-red-300 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/4 xl:w-1/3 text-center text-3xl font-bold rounded-lg shadow-lg p-8">
        <div className="h-1/4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Home</h1>
        </div>
        <div className="h-3/4 flex flex-col items-center justify-center">
          <Link className="my-4 w-full md:w-3/4 bg-gray-200 text-2xl font-bold rounded-lg shadow-xl hover:bg-lime-600 transition-colors duration-300 flex items-center justify-center h-12" 
          href="/select">
            Save Requisition
          </Link>
          <Link className="my-4 w-full md:w-3/4 bg-gray-200 text-2xl font-bold rounded-lg shadow-xl hover:bg-pink-400 transition-colors duration-300 flex items-center justify-center h-12"
          href="/">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
