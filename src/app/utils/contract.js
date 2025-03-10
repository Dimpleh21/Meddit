import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/DoctorRegister.sol/registration.json"; // Ensure correct path

const CONTRACT_ADDRESS = "0x6160D0Ca6ad8AA9Cc68d143D01591d8050b7dD9f"; // Replace with actual contract address

export const getContract = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    } catch (error) {
      console.error("Error connecting to contract:", error);
      return null;
    }
  } else {
    console.error("Ethereum wallet not detected.");
    return null;
  }
};

// Connect Wallet
export const connectWallet = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
      await provider.send("eth_requestAccounts", []);
      console.log("Wallet connected!");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  } else {
    alert("Please install MetaMask!");
  }
};
