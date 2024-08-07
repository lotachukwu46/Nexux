// ProgressBar.js
import React from "react";
import { motion } from "framer-motion";
import "./progressBar.scss";

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ProgressBar;
