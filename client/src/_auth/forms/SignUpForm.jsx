import React, { useState } from "react";
import "../../styles/signUpForm.scss";
import AccountTypeSelection from "./signUpFormComponent/AccountTypeSelection";
import NameInfo from "./signUpFormComponent/NameInfo";
import GenderDOB from "./signUpFormComponent/GenderDOB";
import AccountCreation from "./signUpFormComponent/AccountCreation";
import ProgressBar from "../../components/progressBar/ProgressBar";
import AccountInfo from "./signUpFormComponent/AccountInfo";
import { motion } from "framer-motion";

const initialValues = {
  accountType: "",
  firstName: "",
  lastName: "",
  day: "",
  month: "",
  year: "",
  gender: "",
  email: "",
  password: "",
  confirmPassword: "",
  confirmationCode: "",
};

const stepComponents = [
  AccountTypeSelection,
  NameInfo,
  AccountInfo,
  GenderDOB,
  AccountCreation,
];

const stepHeadings = [
  "Select Account Type",
  "What is your name?",
  "Account Info",
  "How old are you?",
  "Create Your Account",
];

const SignUpForm = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formValues, setFormValues] = useState(() => {
    const savedValues = localStorage.getItem("signUpFormValues");
    return savedValues ? JSON.parse(savedValues) : initialValues;
  });

  const handleFormChange = (values) => {
    const updatedValues = { ...formValues, ...values };
    setFormValues(updatedValues);
    localStorage.setItem("signUpFormValues", JSON.stringify(updatedValues));
  };

  const handleNextStep = () => {
    setDirection(1);
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setDirection(-1);
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    handleFormChange(values);
    console.log(values);
    localStorage.removeItem("signUpFormValues");
    setSubmitting(false);
  };

  const DynamicComponent = stepComponents[step];

  return (
    <div className="sign-up-form">
      <motion.div
        initial={{ opacity: 0, x: direction === 1 ? -1000 : 1000 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 1 ? -1000 : 1000 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
      >
        <DynamicComponent
          accountType={formValues.accountType}
          handleAccountTypeChange={(e) =>
            handleFormChange({ accountType: e.target.value })
          }
          initialValues={formValues}
          handleSubmit={handleSubmit}
          handleFormChange={handleFormChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      </motion.div>
    </div>
  );
};

export default SignUpForm;
