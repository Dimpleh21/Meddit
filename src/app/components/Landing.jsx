"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import MainCmp from "./MainCmp";
import DocForm from "../components/DocForm";
import PatForm from "../components/PatForm";

export default function Landing() {
  const [isDocFormOpen, setIsDocFormOpen] = useState(false);
  const [isPatFormOpen, setIsPatFormOpen] = useState(false);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url('/landing1.png')` }}
    >
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full text-center px-4 gap-7 mt-18">
        <div className="text-5xl text-blue-950 max-w-2xl font-medium">
          A Place where your medical Records are secure.
        </div>
        <div>Your secure and decentralised locker for medical records.</div>
        <div className="flex gap-4">
          {/* Open DocForm Modal */}
          <button
            className="bg-blue-950 text-white p-2.5 rounded-3xl w-48 hover:bg-blue-800"
            onClick={() => setIsDocFormOpen(true)}
          >
            Register as Doctor
          </button>

          {/* Open PatForm Modal */}
          <button
            className="bg-blue-950 text-white p-2.5 rounded-3xl w-48 hover:bg-blue-800"
            onClick={() => setIsPatFormOpen(true)}
          >
            Register as Patient
          </button>
        </div>
        <MainCmp />
      </div>

      {/* Modals */}
      <DocForm isOpen={isDocFormOpen} onClose={() => setIsDocFormOpen(false)} />
      <PatForm isOpen={isPatFormOpen} onClose={() => setIsPatFormOpen(false)} />
    </div>
  );
}
