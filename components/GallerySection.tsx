"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Masonry from "react-masonry-css";

const galleryData = [
  { src: "https://picsum.photos/seed/ega1/600/800", caption: "Network Complaint System" },
  { src: "https://picsum.photos/seed/ega2/600/400", caption: "Daily Worker Finder" },
  { src: "https://picsum.photos/seed/ega3/600/700", caption: "IwakRejosari App" },
  { src: "https://picsum.photos/seed/ega4/600/500", caption: "Internship - Kominfo" },
  { src: "https://picsum.photos/seed/ega5/600/600", caption: "UI/UX Design Work" },
  { src: "https://picsum.photos/seed/ega6/600/450", caption: "Backend Development" },
];

const breakpoints = { default: 3, 1024: 2, 640: 1 };

export default function GallerySection() {
  return (
    <section id="gallery" className="section-shell py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="font-heading text-3xl font-bold text-white mb-2">Gallery</h2>
        <div
          className="w-16 h-1 rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </div>

      <Masonry
        breakpointCols={breakpoints}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {galleryData.map((item, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-5% 0px" });
          return (
            <motion.div
              key={i}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
              className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: "linear-gradient(to top, rgba(4,2,11,0.9), transparent)" }}
              >
                <p className="text-white font-medium text-sm">{item.caption}</p>
              </div>
            </motion.div>
          );
        })}
      </Masonry>
    </section>
  );
}
