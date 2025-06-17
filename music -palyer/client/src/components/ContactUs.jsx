import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-card to-white">
      {/* Header/Navbar */}
      <Header />

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-6 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl p-4 sm:p-6 md:p-10 border border-primary"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-headingColor mb-8 tracking-wide"
          >
            Contact Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base sm:text-lg md:text-xl text-textColor"
          >
            {/* Admin Section */}
            <div className="hover:scale-[1.02] cursor-pointer transition-transform duration-300 ease-in-out bg-card p-6 rounded-xl shadow-inner border border-primary/30">
              <p className="text-xl sm:text-2xl font-bold text-headingColor mb-3">Admin</p>
              <p><span className="font-semibold">Name:</span> Ibad Ullah Khan</p>
              <p><span className="font-semibold">Phone:</span> 0341 1850048</p>
              <p><span className="font-semibold">Email:</span> ibad50008@gmail.com</p>
              <p><span className="font-semibold">Address:</span> University of Management and Technology, Lahore</p>
            </div>

            {/* Team Section */}
            <div className="hover:scale-[1.02] cursor-pointer transition-transform duration-300 ease-in-out bg-card p-6 rounded-xl shadow-inner border border-primary/30">
              <p className="text-xl sm:text-2xl font-bold text-headingColor mb-3">Team</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="font-semibold">Ibad Ullah Khan</span> – CEO & Developer</li>
                <li><span className="font-semibold">Sanay Muhammad</span> – COO & Developer </li>
                <li><span className="font-semibold">Jilbaz Khan</span> –Mannager & Developer  </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
