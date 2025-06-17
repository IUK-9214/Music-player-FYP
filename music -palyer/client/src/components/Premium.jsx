import React from "react";
import { motion, scale } from "framer-motion";
import Header from "./Header";

const Premium = () => {
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
          className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl p-4 sm:p-6 md:p-10 border border-primary"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-headingColor mb-6 md:mb-10 tracking-wide"
          >
            Go Premium
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center text-sm sm:text-base md:text-xl text-textColor mb-6 md:mb-10"
          >
            Unlock exclusive features, priority support, and early access to new songs by joining our Premium Membership.
          </motion.p>

          {/* Premium Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-textColor"
          >
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1">Card Details</label>
              <input
                type="text"
                placeholder="Card Number (0000 0000 0000 0000)"
                className="px-4 py-2 rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="md:col-span-2">
              <motion.button 
                type="button"
                className="w-full py-3 mt-2 text-white bg-headingColor rounded-lg font-bold text-lg tracking-wide hover:bg-headingColor/90 transition duration-300"
                whileTap={{scale:0.5}}
              >
                Buy Premium (PKR 999)
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;
