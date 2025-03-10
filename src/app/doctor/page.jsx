"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { getContract } from "../utils/contract"; // Ensure correct import path
import TempBar from "../components/TempBar"; // Import TempBar component
export default function DoctorDashboard() {
  const router = useRouter();

  // Dummy doctor profile
  const doctor = {
    name: "Dr. Emily Carter",
    specialty: "Cardiologist",
    experience: "10+ years",
    hospital: "City Heart Center",
  };

  // Dummy assigned patients
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 35,
      condition: "Hypertension",
      hasRecords: true,
    },
    {
      id: 2,
      name: "Sarah Lee",
      age: 40,
      condition: "Diabetes",
      hasRecords: false,
    },
  ]);

  return (
    <div
      style={{ backgroundImage: `url('/pg2.png')` }}
      className="min-h-screen bg-cover bg-center p-6"
    >
      <TempBar />
      {/* Doctor Profile */}
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold">Doctor Profile</h2>
        <p>
          <strong>Name:</strong> {doctor.name}
        </p>
        <p>
          <strong>Specialty:</strong> {doctor.specialty}
        </p>
        <p>
          <strong>Experience:</strong> {doctor.experience}
        </p>
        <p>
          <strong>Hospital:</strong> {doctor.hospital}
        </p>
      </div>

      {/* Assigned Patients */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Assigned Patients
        </h2>
        {patients.length > 0 ? (
          <ul className="space-y-4">
            {patients.map((patient) => (
              <li
                key={patient.id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{patient.name}</p>
                  <p>
                    <strong>Age:</strong> {patient.age}
                  </p>
                  <p>
                    <strong>Condition:</strong> {patient.condition}
                  </p>
                  <p className="font-semibold text-blue-500">Wanna Meet? 🤝</p>
                </div>
                {patient.hasRecords && (
                  <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                    Download Records
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No assigned patients found.
          </p>
        )}
      </div>
    </div>
  );
}
