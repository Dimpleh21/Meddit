"use client";
import { motion } from "framer-motion";

const crimes = [
  {
    title: "Springhill Medical Center Ransomware Attack (2019)",
    description:
      "A ransomware attack crippled hospital systems, leading to a baby's preventable death due to delayed emergency care. A decentralized, secure medical record system could have ensured continued access to patient data.",
    color: "#899CD1",
  },
  {
    title: "Hurricane Katrina Medical Data Loss (2005)",
    description:
      "Over 1 million medical records were lost when hospitals were flooded. Many patients couldn't prove their medical history, causing treatment delays. Decentralized cloud-based records could have prevented this.",
    color: "#A6B8E0",
  },
  {
    title: "Britney Spears’ Mental Health Records Leak (2007)",
    description:
      "During her public breakdown, confidential medical information was leaked to the press. A decentralized, encrypted system would have protected her privacy and prevented media exploitation.",
    color: "#6D81B4",
  },
  {
    title: "India’s Aadhaar Health Data Breach (2018)",
    description:
      "Over 1 billion medical records were exposed due to Aadhaar security flaws, making citizens vulnerable to identity theft. Blockchain-based identity systems could have secured sensitive health data.",
    color: "#B3C4E8",
  },
  {
    title: "UK NHS Mental Health Data Sold to Third Parties (2016)",
    description:
      "Confidential mental health data of thousands of patients was shared with private companies without consent. Decentralized patient-controlled records would have ensured privacy and transparency.",
    color: "#5A6D9E",
  },
  {
    title: "Ambulance Delays in the UK (2023)",
    description:
      "Patients in critical condition faced delays because hospital systems couldn’t retrieve previous records fast enough. A decentralized medical system would have allowed instant access and saved lives.",
    color: "#7C91C5",
  },
  {
    title: "Doctor Altered Medical Records to Cover Malpractice (2018)",
    description:
      "A surgeon in New York changed a patient's medical records after a botched surgery, trying to cover up the mistake. Blockchain-based records would have prevented data tampering.",
    color: "#4E638A",
  },
  {
    title: "Insurance Fraud Using Fake Medical Reports (2019)",
    description:
      "A group of criminals in Florida created fake patient records to claim millions in insurance fraud. Decentralized records would have ensured authenticity and prevented false claims.",
    color: "#A1B3DA",
  },
  {
    title: "Russian Hospital Falsified COVID-19 Death Records (2020)",
    description:
      "Reports surfaced that hospitals in Russia altered patient death certificates to underreport COVID-19 fatalities. An immutable blockchain system would have ensured transparency.",
    color: "#8A9FC8",
  },
];

export default function HealthCrimes() {
  return (
    <div className="py-16 px-8">
      <h2 className="text-blue-900 text-4xl font-semibold text-center mb-10">
        Health Crimes & Data Breaches
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {crimes.map((crime, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-lg shadow-lg border-1 border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-[#395090] text-2xl font-semibold">
              {crime.title}
            </h3>
            <p className="text-[#687aab] mt-3">{crime.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
