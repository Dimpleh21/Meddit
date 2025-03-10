"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { getContract } from "../utils/contract"; // Import contract interaction logic

export default function DocForm({ isOpen, onClose }) {
  const router = useRouter(); // Initialize router

  const [formData, setFormData] = useState({
    walletAddress: "",
    fullName: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    hospitalName: "",
    hospitalLocation: "",
    department: "",
    specialization: "",
    designation: "",
    experience: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, phone, password, confirmPassword, experience } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number! Must be 10 digits.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    if (parseInt(experience) < 0) {
      alert("Experience cannot be negative!");
      return false;
    }
    return true;
  };

  const handleRegisterDoctor = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const contract = await getContract(); // Get smart contract instance
      const { walletAddress, fullName, specialization, designation } = formData;

      const tx = await contract.registerDoctor(
        walletAddress,
        fullName,
        specialization,
        designation
      );

      await tx.wait();

      console.log("Doctor registered successfully!");
      alert("Doctor registration successful!");

      // ✅ Redirect to doctor dashboard after registration
      router.push("/doctor");

      // Reset form
      setFormData({
        walletAddress: "",
        fullName: "",
        email: "",
        dob: "",
        gender: "",
        phone: "",
        hospitalName: "",
        hospitalLocation: "",
        department: "",
        specialization: "",
        designation: "",
        experience: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error registering doctor:", error);
      alert("Registration failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Hide modal when isOpen is false

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[750px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Doctor Registration</h2>
          <button
            className="text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "walletAddress", placeholder: "Wallet Address" },
            { name: "fullName", placeholder: "Full Name" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "dob", type: "date" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "hospitalName", placeholder: "Hospital Name" },
            { name: "hospitalLocation", placeholder: "Hospital Location" },
            { name: "department", placeholder: "Department" },
            { name: "specialization", placeholder: "Specialization" },
            { name: "designation", placeholder: "Designation" },
            { name: "experience", placeholder: "Years of Experience" },
            { name: "password", placeholder: "Password", type: "password" },
            {
              name: "confirmPassword",
              placeholder: "Confirm Password",
              type: "password",
            },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          ))}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          className="mt-6 w-1/3 bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800"
          onClick={handleRegisterDoctor}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}
