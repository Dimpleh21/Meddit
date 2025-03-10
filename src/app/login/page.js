"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getContract } from "../utils/contract";

const Login = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setUserAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed! Please install it to proceed.");
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length === 0) return;

      const address = accounts[0];
      setUserAddress(address);

      const contract = await getContract(true);
      if (!contract) return;

      // Check if user is a patient or a doctor
      const isPatient = await contract.isPatient(address);
      const isDoctor = await contract.isDoctor(address);

      if (isPatient) {
        router.push("/patient-dashboard");
      } else if (isDoctor) {
        router.push("/doctor-dashboard");
      } else {
        alert("Access Denied! You are not registered as a patient or doctor.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <p className="mb-4 text-gray-600">
          Connect your MetaMask wallet to log in.
        </p>

        {userAddress ? (
          <p className="text-green-600 font-semibold mb-4">
            Connected: {userAddress}
          </p>
        ) : (
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? "Connecting..." : "Login with MetaMask"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
