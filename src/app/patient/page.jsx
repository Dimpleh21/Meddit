"use client";
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import TempBar from "../components/TempBar";
const PatientDashboard = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts.length > 0) {
            const address = accounts[0];
            setUserAddress(address);
            console.log("Connected Wallet Address:", address);
            await fetchPatientDetails(address);
          }
        } catch (error) {
          console.error("Error fetching user address:", error);
        }
      } else {
        console.error("MetaMask not found!");
      }
    };

    const fetchPatientDetails = async (address) => {
      try {
        const contract = await getContract(true);
        if (!contract) return;

        const patientData = await contract.getPatientDetails(address);
        setPatient({
          name: patientData.name,
          bloodGroup: patientData.bloodGroup,
        });
        console.log("Patient Details:", patientData);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchData = async () => {
      try {
        const contract = await getContract(true);
        if (!contract) return;

        if (!userAddress) return; // Ensure user address is available

        const reportUrls = await contract.getReports(userAddress);
        const fetchedReports = await Promise.all(
          reportUrls.map(async (url, index) => {
            return {
              name: `Report ${index + 1}`,
              url,
              uploadedBy: patient.name,
            };
          })
        );
        setReports(fetchedReports);

        const doctorsList = await contract.getAuthorizedDoctors();
        setDoctors(
          doctorsList.map((doc) => ({
            id: doc.id,
            name: doc.name,
            specialty: doc.specialty,
            hasAccess: doc.hasAccess,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAddress();
    fetchData();
  }, [userAddress]);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);

    try {
      const uploadedRecords = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Upload failed");

          const contract = await getContract(true);
          if (contract) {
            const tx = await contract.uploadReport(data.url);
            await tx.wait();
          }

          return {
            name: file.name,
            url: data.url,
            uploadedBy: await patient.name,
          };
        })
      );

      setReports((prevReports) => [...prevReports, ...uploadedRecords]);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleGrantAccess = async (doctorId) => {
    try {
      const contract = await getContract(true);
      const tx = await contract.grantAccess(doctorId);
      await tx.wait();

      setDoctors((prevDoctors) =>
        prevDoctors.map((doc) =>
          doc.id === doctorId ? { ...doc, hasAccess: true } : doc
        )
      );

      alert("Access granted!");
    } catch (error) {
      console.error("Grant access failed:", error);
      alert("Failed to grant access.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/pg2.png')` }}
    >
      <TempBar />
      <h2 className="text-2xl font-bold text-center mb-6">Patient Dashboard</h2>

      {/* Patient Profile */}
      {patient ? (
        <div className="mb-6 p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center">Patient Profile</h2>
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Condition:</strong> {patient.condition}
          </p>
          <p>
            <strong>Medical History:</strong> {patient.history}
          </p>
          <p>
            <strong>Medications:</strong> {patient.medications}
          </p>
        </div>
      ) : (
        <p className="text-center">Loading patient details...</p>
      )}

      {/* File Upload Section */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Upload Medical Records
        </h2>
        <input
          type="file"
          accept=".pdf,.jpg,.png,.jpeg"
          multiple
          onChange={handleFileUpload}
          className="block w-full border p-2 rounded-lg"
        />
        {uploading && (
          <p className="text-center text-blue-500 mt-2">Uploading...</p>
        )}
      </div>

      {/* Uploaded Reports */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Uploaded Medical Records
        </h2>
        {loading ? (
          <p className="text-center">Loading reports...</p>
        ) : reports.length > 0 ? (
          <ul className="space-y-4">
            {reports.map((report, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{report.name}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded by: {report.uploadedBy}
                  </p>
                </div>
                <a
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  View Report
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No records uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
