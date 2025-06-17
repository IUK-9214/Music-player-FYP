import React from 'react';
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardHome from "./DashboardHome";
import Alert from "./Alert";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";

const Home = () => {
  const [{ alertType }] = useStateValue();

  return (
    <motion.div
      className="w-full h-auto flex flex-col items-center justify-center bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ✅ Static Header (no motion) */}
      <div className="w-full">
        <Header />
      </div>

      {/* Nav Links with animation */}
      <motion.div
        className="w-[60%] my-2 p-4 flex items-center justify-evenly"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
      </motion.div>

      {/* Main Content (animated) */}
      <motion.div
        className="my-4 w-full p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="home" element={<DashboardHome />} />
        </Routes>
      </motion.div>

      {/* Alert */}
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

export default Home;
