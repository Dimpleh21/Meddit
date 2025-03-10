"use client";
import { useState, useEffect } from "react";
import { getContract } from "../utils/contract";

export default function PatForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    bloodGroup: "",
    walletAddress: "",
  });

  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (formData.walletAddress) {
      checkIfRegistered(formData.walletAddress);
    }
  }, [formData.walletAddress]);

  const fetchWalletAddress = async () => {
    if (!window.ethereum) {
      setError("MetaMask not found! Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          walletAddress: accounts[0],
        }));
        checkIfRegistered(accounts[0]); // Check if the address is already registered
      }
    } catch (error) {
      setError("Error fetching wallet address. Please check MetaMask.");
      console.error("MetaMask Error:", error);
    }
  };

  const checkIfRegistered = async (walletAddress) => {
    try {
      const contract = await getContract(false); // Read-only contract instance
      const patientData = await contract.getPatientDetails(walletAddress);

      // If patientData exists and has a valid name, mark as registered
      if (patientData && patientData.fullName && patientData.fullName !== "") {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    if (!formData.fullName || !formData.bloodGroup || !formData.walletAddress) {
      setError("All fields are required. Please enter your wallet address.");
      return;
    }

    if (isRegistered) {
      setError("You are already registered!");
      return;
    }

    setRegistering(true);

    try {
      const contract = await getContract(true);
      if (!contract) throw new Error("Failed to load the contract.");

      const tx = await contract.registerPatient(
        formData.fullName,
        formData.bloodGroup
      );

      await tx.wait();
      alert("🎉 Patient registered successfully!");

      // Reset form but retain wallet address
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        bloodGroup: "",
      }));

      setIsRegistered(true); // Mark as registered
      onClose();
    } catch (error) {
      console.error("Registration Error:", error);
      setError("⚠️ Registration failed! Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Patient Registration</h2>
          <button
            className="text-red-600 hover:text-gray-800"
            onClick={onClose}
            disabled={registering}
          >
            ✖
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="flex">
            <input
              className="border p-2 rounded flex-1"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleInputChange}
              placeholder="Enter Wallet Address"
            />
            <button
              className="ml-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-800"
              onClick={fetchWalletAddress}
              type="button"
            >
              Use MetaMask
            </button>
          </div>

          <input
            className="border p-2 rounded"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter Full Name"
          />
          <select
            className="border p-2 rounded"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Register Button */}
        <button
          className="mt-6 w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-800 disabled:bg-gray-500"
          onClick={handleRegister}
          disabled={registering || isRegistered}
        >
          {isRegistered
            ? "Already Registered"
            : registering
            ? "Registering..."
            : "Register"}
        </button>
      </div>
    </div>
  );
}
