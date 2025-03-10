import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="h-20 border-b-1 border-blue-100">
      <div className="flex items-center gap-8 ml-[50px] text-md text-gray-500 p-4">
        <div className="text-blue-900 font-semibold">PatientFirst</div>
        <div className="ml-[100px] flex items-center gap-8">
          <div>
            <Link href="/">Why Us?</Link>
          </div>
          <div>
            <Link href="/">About Us</Link>
          </div>
          <div>
            <Link href="/doctor">Your Doctors</Link>
          </div>
          <div>
            <Link href="/patient">Your Records</Link>
          </div>
          <div>
            <Link href="/">Features and Pricing</Link>
          </div>
          <div className="flex items-center gap-4 ml-7">
            <div className="text-blue-900"> Log In</div>
            <button className="border-blue-900 text-blue-900 rounded-3xl w-48 border-2 h-10 p-1.5">
              Upload Your Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
