"use client";

import Masonry from "react-masonry-css";
import ScrollReveal from "@/components/ScrollReveal";

// ============================================================
// Gallery image docs:
// 1. Put images in /public/gallery/
// 2. Use names gallery-1.jpg ... gallery-6.jpg
// 3. Supported formats: .jpg .jpeg .png .webp
// 4. Recommended min size: 800x600px
// ============================================================

const galleryData = [
  {
    src: "/gallery/gallery-1.jpg",
    fallback: "https://picsum.photos/seed/ega-gallery-1/1200/900",
    caption: "Network Complaint System - UI",
  },
  {
    src: "/gallery/gallery-2.jpg",
    fallback: "https://picsum.photos/seed/ega-gallery-2/900/1200",
    caption: "Daily Worker Finder - Mobile",
  },
  {
    src: "/gallery/gallery-3.jpg",
    fallback: "https://picsum.photos/seed/ega-gallery-3/1200/1100",
    caption: "IwakRejosari - Booking Flow",
  },
  {
    src: "/gallery/gallery-4.jpg",
    fallback: "https://picsum.photos/seed/ega-gallery-4/1000/1300",
    caption: "Backend API - Dashboard",
  },
  {
    src: "/gallery/gallery-5.jpg",
    fallback: "https://picsum.photos/seed/ega-gallery-5/1100/900",
    caption: "Project Documentation",
  },
  {
    src: "/gallery/gallery-6.jpg",
    fallback: "https://picsum.photos/seed/ega-gallery-6/900/1100",
    caption: "Development Workspace",
  },
];

const breakpoints = { default: 3, 1024: 2, 640: 1 };

export default function GallerySection() {
  return (
    <section id="gallery" className="section-shell scroll-mt-28 py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ScrollReveal direction="up">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Gallery</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">Snapshots</h2>
        </ScrollReveal>

        <Masonry
          breakpointCols={breakpoints}
          className="mt-8 flex gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {galleryData.map((item, index) => (
            <ScrollReveal key={item.caption} direction="up" delay={index * 0.05}>
              <article className="gallery-item group relative overflow-hidden rounded-2xl border border-white/15 bg-black/25">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = item.fallback;
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{item.caption}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </Masonry>
      </div>
    </section>
  );
}
