import React from "react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-red-300 flex flex-col items-center justify-center h-screen p-2">
      <div className="bg-white w-2/4 h-2/4 text-center text-3xl font-bold rounded-lg shadow-x p-4">
        <div className="h-1/4 text-center text-3xl">
          <h1 className="text-5xl font-bold">Home</h1>
        </div>
        <div className="h-3/4 flex flex-col items-center justify-center">
          <Link className="my-2 w-3/4 bg-gray-200 text-2xl font-bold rounded-lg shadow-xl hover:bg-lime-600 transition-colors duration-300 flex items-center justify-center h-10" 
          href="/select">
            Save Requisition
          </Link>
          <Link className="my-2 w-3/4 bg-gray-200 text-2xl font-bold rounded-lg shadow-xl hover:bg-pink-400 transition-colors duration-300 flex items-center justify-center h-10" 
          href="/">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
