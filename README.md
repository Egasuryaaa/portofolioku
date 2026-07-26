# Surya.Tech — Interactive 3D Developer Portfolio 🤖✨

<div align="center">
  <p>
    <strong>A highly premium, interactive 3D developer portfolio crafted with Next.js 14, React Three Fiber, WebGL Fluid Simulations, and Framer Motion.</strong>
  </p>
  <p>
    Built in indonesia by <a href="https://github.com/Egasuryaaa">Ega Surya Saputra</a> — Based in Mojokerto, East Java.
  </p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Three.js / R3F](https://img.shields.io/badge/React_Three_Fiber-3D-black?style=for-the-badge&logo=three.js&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

---

## 🌟 Overview

**Surya.Tech** is a state-of-the-art single-page personal web portfolio showcasing full-stack capabilities across **Backend Development, Mobile Applications, Hardware/IoT Systems, and UI/UX Architecture**. 

Instead of a static presentation, this repository demonstrates modern interactive web aesthetics: an evolving **3D Robot companion** that navigates across sections via synchronized scroll keyframes, a physics-based suspended **Lanyard badge**, and ambient **WebGL interactive liquid backgrounds** with effortless responsiveness across desktop and mobile devices.

---

## ✨ Highlights & Features

- 🤖 **Interactive 3D Robot Companion (`ScrollModel3D`)**
  - Features custom scroll-driven keyframe trajectory animations mapped cleanly across sections using `@react-three/fiber` & `framer-motion`.
  - Seamless touch and mouse 360° interactive rotation with snapping feedback when reaching the Contact hub.
- 🪪 **Physics-Simulated 3D Badge (`Lanyard`)**
  - A real-time gravity and ragdoll simulated identity badge built with `@react-three/rapier` in the Hero section.
- 🌊 **Realtime WebGL Liquid Ether & Ambient Orbs (`LiquidEther`)**
  - Dynamic fluid interactive simulation background responding smoothly to pointer movement with vibrant custom color tones.
- 🎨 **Premium UI Components & Micro-Interactions**
  - **`ScrollStack`**: Native window-based stacking card interactions for the Projects gallery.
  - **`ScrollVelocity` & `LogoLoop`**: Infinite pure-CSS marquee loops highlighting core technical skills and brand logos.
  - **`AnimatedContent` & `ScrollFloat`**: Staggered physics-based reveal transitions for Skills & About storytelling.
  - **`BubbleMenu` & `PillNav`**: Adaptive glassmorphism navigation—a sleek floating desktop pill and a dynamic rotating mobile bubble menu.
- ⚡ **Performance & Best Practices**
  - Next.js App Router setup with strategic Client / Server Component architecture.
  - Dynamic module imports (`next/dynamic` with `ssr: false` for WebGL/Three.js assets) ensuring rapid initial hydration and optimized bundle size.

---

## 🛠️ Technology Stack & Architecture

### **Core Frontend Architecture**
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) + [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) / JavaScript (ESPlus)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Design Tokens
- **Typography**: Optimized loading with Vercel's Geist Font System

### **3D Rendering & Physics Engine**
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) (Physics & Gravity Engine)
- [Meshline](https://github.com/spite/THREE.MeshLine)

### **Animation & Interaction Drivers**
- [Framer Motion / Motion](https://www.framer.com/motion/) (Scroll-linked keyframing, springs, & gesture physics)
- [GSAP (GreenSock)](https://gsap.com/)
- [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Scroll Momentum)
- [Lucide React](https://lucide.dev/)

---

## 📂 Featured Projects Showcase

The interactive project gallery (`#projects`) highlights significant production works and technical implementations:

1. **🖧 Network Complaint Management System** — *Diskominfo Gunungkidul* (CodeIgniter, PostgreSQL, REST API, Flutter)
2. **🔧 Daily Worker Finder App (Rampungin.id)** — *Gunungkidul Regency* (Flutter, MySQL, REST API, CodeIgniter)
3. **🐟 IwakRejosari Aquaculture Marketplace** — *Marketplace System* (Flutter, Laravel, REST API, MySQL)
4. **👔 Formalfitku E-Commerce Platform** — *Custom Formal Wear Website* (Laravel, Tailwind CSS, MySQL)
5. **🎒 IoT Geofence Smart Tracker Backpack** — *Embedded Security Hardware* (IoT, Geofencing, Microcontroller Hardware)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18.0.0 or later)** installed on your operating system.

### 2. Installation
Clone the repository and install dependencies using your preferred package manager:

```bash
git clone https://github.com/Egasuryaaa/portofolio.git
cd portofolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 3. Development Server
Start the local development server with Hot-Module-Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 4. Production Build
To run type checking, ESLint verification, and bundle the optimized static production output:

```bash
npm run build
npm run start
```

---

## 📬 Connect with Me

Interested in collaborating, discussing system architecture, or exploring freelance & full-time opportunities? Feel free to reach out directly:

- ✉️ **Email**: [egasurya04@gmail.com](mailto:egasurya04@gmail.com)
- 🐙 **GitHub**: [github.com/Egasuryaaa](https://github.com/Egasuryaaa)
- 📞 **WhatsApp**: [+62 822-5710-8680](https://wa.me/6282257108680?text=Halo%20Ega,%20saya%20tertarik%20dengan%20portfolio%20Anda!)
- 📍 **Location**: Mojokerto, East Java, Indonesia

---

<div align="center">
  <p>Built with Passion & Excellence in Indonesia by <strong>Ega Surya Saputra</strong> · © 2026</p>
</div>
