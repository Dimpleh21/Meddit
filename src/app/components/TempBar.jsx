import Link from "next/link";
export default function TempBar() {
  return (
    <div className="border-b-1 border-blue-200 h-14">
      <div className="justify-center items-center ml-[1050px]">
        <button className="border-2 border-blue-950 h-10 w-42 rounded-3xl mt-2 hover:bg-blue-950 hover:text-white">
          <Link href="/">Back to Home</Link>
        </button>
      </div>
    </div>
  );
}
