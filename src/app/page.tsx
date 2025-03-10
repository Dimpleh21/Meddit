import Image from "next/image";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import SecondPage from "./components/SecondPage";
import HealthCrimes from "./components/HealthCrimes";
import Techstacks from "./components/TechStacks"; // Ensure this file exists in the components directory
import Footer from "./components/Footer";
// import StepsToUse from "./components/StepsToUse";
import UsageBenefits from "./components/Benefits";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}

      <Landing />

      <SecondPage />
      {/* <StepsToUse /> */}
      <UsageBenefits />
      <HealthCrimes />
      <Techstacks />
      <Footer />
    </>
  );
}
