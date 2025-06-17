import React from 'react';
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardSongs from "./DashboardSongs";
import Alert from "./Alert";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion"; // ✅ motion still used

const Music = () => {
  const [{ alertType }] = useStateValue();

  return (
    <motion.div
      className="w-full h-auto flex flex-col items-center justify-center bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ✅ Static Header without animation */}
      <div className="w-full">
        <Header />
      </div>

      {/* ✅ Main Content with motion */}
      <motion.div
        className="my-4 w-full p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Routes>
          <Route path="/" element={<DashboardSongs />} />
          <Route path="home" element={<DashboardSongs />} />
        </Routes>
      </motion.div>

      {/* ✅ Alert with motion */}
      {alertType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Alert type={alertType} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Music;
