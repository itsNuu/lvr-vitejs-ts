import React from "react";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="text-center p-6 bg-white shadow-xl rounded-lg max-w-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Project API Laravel + ReactJS
        </h1>
        <p className="text-lg text-gray-700">
          Welcome to the project integrating Laravel API with Vite ReactJS
          TypeScript!
          <br />
          Explore the functionalities and see how these technologies work
          together.
        </p>
      </div>
    </main>
  );
};

export default Home;
