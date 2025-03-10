import Image from "next/image";

export default function SecondPage() {
  return (
    <div className="bg-[#899CD1] h-screen text-white">
      <div className="flex flex-col items-center justify-center h-full gap-4 ">
        <div className="text-3xl font-semibold">What we do?</div>
        <div className="text-md text-center max-w-2xl mt-7">
          Our platform is designed to revolutionize medical record management by
          providing a secure, decentralized, and user-controlled system.
          Patients can store their entire medical history, including
          prescriptions, lab results, and diagnoses, in a tamper-proof
          blockchain ledger, ensuring their records are always accessible and
          cannot be altered or lost. With zero-knowledge encryption, data
          remains private and confidential, allowing only authorized personnel
          to access it without exposing sensitive details. Doctors and
          healthcare providers can securely retrieve patient records, reducing
          redundancies, improving diagnosis accuracy, and streamlining treatment
          plans. Our system eliminates the hassle of paperwork, enabling
          real-time record updates and ensuring interoperability between
          hospitals, clinics, and specialists. By putting patients in full
          control of their medical data, we empower them to share records
          selectively, improving healthcare efficiency while maintaining the
          highest standards of security and privacy.
        </div>
      </div>
      <Image
        src="/whealth.png"
        alt="presc"
        width={250}
        height={400}
        className="ml-240 mt-[-190px] rotate-45"
      />
    </div>
  );
}
