import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../../styles/signupComponentStyles/accountCreation.scss";
import { motion } from "framer-motion";

const AccountCreation = ({
  initialValues,
  handleFormChange,
  handleSubmit,
  handlePreviousStep,
}) => {
  const [otpSent, setOtpSent] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      confirmationCode: Yup.string().required("OTP is required"),
      agreement: Yup.bool().oneOf([true], "You must accept the agreement"),
    }),
    onSubmit: (values) => {
      handleFormChange(values);
      handleSubmit(values, formik);
    },
  });

  const handleSendOtp = () => {
    // Simulate sending OTP
    console.log("Sending OTP to:", formik.values.email);
    setOtpSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 1 ? 1000 : -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -1000 : 1000 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="account-creation"
    >
      <h2>Verify Your Account</h2>
    </motion.div>
  );
};

export default AccountCreation;
