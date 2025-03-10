"use client";
import {
  FaHospital,
  FaUserShield,
  FaLock,
  FaExchangeAlt,
} from "react-icons/fa";

export default function UsageBenefits() {
  const features = [
    {
      icon: <FaUserShield size={28} />,
      title: "Full Data Control",
      description:
        "Your medical records are securely stored and only accessible by you and authorized personnel.",
    },
    {
      icon: <FaLock size={28} />,
      title: "Enhanced Privacy",
      description:
        "No third parties can alter or misuse your health data, ensuring patient confidentiality.",
    },
    {
      icon: <FaHospital size={28} />,
      title: "Universal Access",
      description:
        "Access your health records from anywhere, anytime—no dependency on a single hospital.",
    },
    {
      icon: <FaExchangeAlt size={28} />,
      title: "Seamless Hospital Switching",
      description:
        "No worries when changing hospitals—your records move with you without any loss or delays.",
    },
  ];

  return (
    <div className="py-16 px-8">
      <h2 className="text-blue-950 text-4xl font-semibold text-center mb-10">
        Why Choose Our Decentralized Health Records?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-lg bg-[#899CD1] text-white flex flex-col items-center text-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
