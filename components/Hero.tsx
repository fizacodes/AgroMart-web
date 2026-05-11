// components/HeroSection.tsx
"use client"
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[url('/images/Home1.png')] bg-contain bg-center bg-no-repeat min-h-[60vh] md:min-h-screen md:bg-cover flex flex-col justify-center items-center text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">Khet se Seedha Khareedar Tak</h1>
      <p className="text-base md:text-lg lg:text-xl mb-6 drop-shadow-md">Apni fasal asani se bechain, beech ke dalalon ke baghair.</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/auth/signup" className="bg-[#F4C430] text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition">Register Now</Link>
        <Link href="/auth/login" className="bg-white text-[#1F7A3F] px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">Login</Link>
      </div>
    </section>
  );
}
