"use client";

import { FaSeedling, FaHandsHelping, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-[#F0F5F2] px-4 py-16 md:min-h-screen">

      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center max-w-6xl mx-auto mb-20">
        {/* Left Text + Design */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 md:pr-12 relative space-y-6"
        >
          {/* Background design shapes */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#F4C430] opacity-30 blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 left-1/4 w-24 h-24 rounded-full bg-[#1F7A3F] opacity-20 blur-2xl animate-pulse"></div>

          {/* Main Text */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1F7A3F] mb-4 relative z-10">
            Empowering Farmers Across Pakistan
          </h1>
          <p className="text-gray-700 text-base md:text-lg relative z-10">
            We connect farmers directly to buyers, eliminate middlemen, and provide a platform for fair trade.
          </p>
          <p className="text-gray-700 text-base md:text-lg relative z-10">
            Join our growing community and make agriculture more transparent, profitable, and sustainable.
          </p>
          <a
            href="/auth/signup"
            className="inline-block mt-4 bg-[#F4C430] text-[#1F7A3F] font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 relative z-10"
          >
            Join Now
          </a>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 relative mb-8 md:mb-0"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
            <img
              src="/images/image.png"
              alt="Farm"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute -top-8 -right-8 bg-[#F4C430] text-[#1F7A3F] px-4 py-2 rounded-lg shadow-lg"
          >
            🌱 500+ Farmers
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute bottom-4 left-8 bg-[#1F7A3F] text-white px-4 py-2 rounded-lg shadow-lg"
          >
            🌾 12000+ Crops Sold
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-[#1F7A3F] mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#F4F4E8] rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300 border-l-4 border-[#1F7A3F]"
          >
            <FaSeedling className="text-[#1F7A3F] mx-auto mb-4 text-4xl md:text-5xl" />
            <h3 className="text-xl font-bold mb-2 text-[#1F7A3F]">Direct Connection</h3>
            <p className="text-gray-700">
              Farmers and buyers interact directly, ensuring better prices and transparency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#FFF9E3] rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300 border-l-4 border-[#F4C430]"
          >
            <FaHandsHelping className="text-[#F4C430] mx-auto mb-4 text-4xl md:text-5xl" />
            <h3 className="text-xl font-bold mb-2 text-[#1F7A3F]">Support & Guidance</h3>
            <p className="text-gray-700">
              Expert guidance to help farmers manage crops and increase productivity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="bg-[#E6F8F1] rounded-xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300 border-l-4 border-[#1F7A3F]"
          >
            <FaLeaf className="text-[#1F7A3F] mx-auto mb-4 text-4xl md:text-5xl" />
            <h3 className="text-xl font-bold mb-2 text-[#1F7A3F]">Sustainable Farming</h3>
            <p className="text-gray-700">
              Promoting eco-friendly farming techniques for a better and greener future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-[#1F7A3F] rounded-xl shadow-lg py-16 px-6 text-center text-white"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Our Core Values</h2>
        <p className="text-base md:text-lg mb-6">
          Transparency, Sustainability, Community Support, and Technology-driven solutions guide
          everything we do. We strive to make agriculture more profitable, fair, and enjoyable.
        </p>
        <a
          href="/auth/signup"
          className="bg-[#F4C430] text-[#1F7A3F] font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300"
        >
          Get Started
        </a>
      </motion.section>
    </div>
  );
}
