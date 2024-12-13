import { useState } from "react";
import logo from "/buildit-logo.png";
import ModaleIA from "../components/ModaleIA";
import "../App.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la modale

  return (
    <div className="home-main bg-bgSecondary h-screen flex flex-col items-center justify-center">
      {/* Logo et titre */}
      <div className="logo flex items-center mb-14">
        <img src={logo} alt="BuildIT logo" className="h-20" />
        <h1 className="text-6xl text-primary ml-2 font-bold">
          BUILD<span className="text-secondary">IT</span>
        </h1>
      </div>

      {/* Bouton */}
      <div className="btn_start_project">
        <button
          className="btn bg-secondary text-white text-lg font-bold py-2 px-6 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-slate-700 hover:border-none transition"
          onClick={() => setIsModalOpen(true)} // Ouvre la modale
        >
          Create a new project
        </button>
      </div>

      {/* Modale */}
      {isModalOpen && (
        <ModaleIA 
          onSave={(data) => console.log(data)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
