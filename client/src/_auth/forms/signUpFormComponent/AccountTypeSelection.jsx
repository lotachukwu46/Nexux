import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../../styles/signupComponentStyles/accountTypeSelection.scss";

const accountOptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
};

const AccountTypeSelection = ({
  accountType,
  handleAccountTypeChange,
  handleNextStep,
  error,
}) => (
  <div className="account-type-selection">
    <h2>Select Your Account Type</h2>
    <motion.div className="account-options" initial="hidden" animate="visible">
      <motion.label
        className={`account-option ${
          accountType === "seller" ? "selected" : ""
        }`}
        variants={accountOptionVariants}
      >
        <input
          type="radio"
          name="accountType"
          value="seller"
          onChange={handleAccountTypeChange}
          checked={accountType === "seller"}
          required
        />
        <span>I’m a seller, listing products</span>
      </motion.label>
      <motion.label
        className={`account-option ${
          accountType === "buyer" ? "selected" : ""
        }`}
        variants={accountOptionVariants}
      >
        <input
          type="radio"
          name="accountType"
          value="buyer"
          onChange={handleAccountTypeChange}
          checked={accountType === "buyer"}
          required
        />
        <span>I’m a buyer, purchasing products</span>
      </motion.label>
    </motion.div>
    {error && <p className="error-message">{error}</p>}
    <motion.button
      type="button"
      className={`join-button ${accountType ? "active" : "disabled"}`}
      onClick={handleNextStep}
      disabled={!accountType}
      variants={buttonVariants}
    >
      {accountType === "seller"
        ? "Join as a Seller"
        : accountType === "buyer"
        ? "Join as a Buyer"
        : "Select Account Type"}
    </motion.button>
    <p className="sign-in-prompt">
      Already have an account? <Link to="/sign-in">Sign in</Link>
    </p>
  </div>
);

export default AccountTypeSelection;
