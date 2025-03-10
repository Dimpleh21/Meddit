export default function StepsToUse() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-10 ">
      <div className="text-4xl font-semibold text-blue-900">
        Steps To Use the Tool
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <div className="border-1 border-blue-950 flex gap-4 rounded-xl p-1 w-[850px]">
          <div className="h-20 w-18 rounded-xl bg-blue-900 text-white p-7">
            1
          </div>
          <div>
            Sign Up & Secure Identity
            <div className="text-sm text-gray-500">
              Register and receive a private key for secure access.
            </div>
          </div>
        </div>
        <div className="border-1 border-blue-950 flex gap-4 rounded-xl p-1 w-[850px]">
          <div className="h-20 w-18 rounded-xl bg-blue-900 text-white p-7">
            2
          </div>
          <div>
            Upload Your Records
            <div className="text-sm text-gray-500">
              Add prescriptions, reports, and health history to the
              decentralized storage.
            </div>
          </div>
        </div>
        <div className="border-1 border-blue-950 flex gap-4 rounded-xl p-1 w-[850px]">
          <div className="h-20 w-18 rounded-xl bg-blue-900 text-white p-7">
            3
          </div>
          <div>
            Grant & Manage Access
            <div className="text-sm text-gray-500">
              Share records with doctors via blockchain-based permissions.
              <br />
              Revoke access anytime.
            </div>
          </div>
        </div>
        <div className="border-1 border-blue-950 flex gap-4 rounded-xl p-1 w-[850px]">
          <div className="h-20 w-18 rounded-xl bg-blue-900 text-white p-7">
            4
          </div>
          <div>
            Emergency Access Setup
            <div className="text-sm text-gray-500">
              Pre-approve hospitals or family for quick access in emergencies.
            </div>
          </div>
        </div>
        <div className="border-1 border-blue-950 flex gap-4 rounded-xl p-1 w-[850px]">
          <div className="h-20 w-18 rounded-xl bg-blue-900 text-white p-7">
            5
          </div>
          <div>
            Tamper-Proof Records
            <div className="text-sm text-gray-500">
              All modifications are immutably logged, preventing fraud.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
