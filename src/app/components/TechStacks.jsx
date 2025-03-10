import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { SiEthereum, SiMongodb } from "react-icons/si";

export default function Techstacks() {
  return (
    <div className="p-8 border-t border-b border-[#899CD1]">
      <div className="flex gap-16 justify-center text-5xl text-[#899CD1]">
        <FaReact title="React" />
        <TbBrandNextjs title="Next.js" />
        <SiEthereum title="Ethereum" />
        <SiMongodb title="MongoDB" />
      </div>
    </div>
  );
}
