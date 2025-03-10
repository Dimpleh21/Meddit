"use client";
import { motion } from "framer-motion";

const categories = [
  {
    title: "X-Rays",
    img: "/xray.jpg",
    rotate: "-20deg",
    x: "-290px",
    y: "40px", // Moves downward
    zIndex: 1,
  },
  {
    title: "Prescriptions",
    img: "/medicine.jpg",
    rotate: "-10deg",
    x: "-150px",
    y: "20px", // Slightly downward
    zIndex: 2,
  },
  {
    title: "Manage it all Yourself",
    img: "/mit.jpg",
    rotate: "0deg",
    x: "0px",
    y: "0px", // Centered
    zIndex: 3,
    scale: 1.1,
  },
  {
    title: "Sexual Health",
    img: "/shealth.jpg",
    rotate: "10deg",
    x: "150px",
    y: "20px", // Slightly downward
    zIndex: 2,
  },
  {
    title: "Insurances",
    img: "/insurance.jpg",
    rotate: "20deg",
    x: "290px",
    y: "40px", // Moves downward
    zIndex: 1,
  },
];

export default function CardSlider() {
  return (
    <>
      <div className="relative flex justify-center items-center py-10 h-80">
        {categories.map((item, index) => (
          <motion.div
            key={index}
            className="absolute w-52 h-72 bg-white rounded-xl shadow-lg flex items-end p-4 cursor-pointer"
            style={{ zIndex: item.zIndex }}
            initial={{
              rotate: item.rotate,
              x: item.x,
              y: item.y, // Added Y displacement
              opacity: 0,
              scale: item.scale || 1,
            }}
            animate={{ opacity: 1, scale: item.scale || 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl p-2"
            />
            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-md border-0.5">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
