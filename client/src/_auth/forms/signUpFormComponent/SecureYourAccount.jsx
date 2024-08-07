import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import FormField from "../../../components/formfield/FormField";
import "../../../styles/signupComponentStyles/accountInfo.scss";

const SecureYourAccount = ({
  initialValues,
  validationSchema,
  handleSubmit,
  handleNextStep,
  handlePreviousStep,
  heading,
  direction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 1 ? 1000 : -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -1000 : 1000 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="security-questions"
    >
      <h2>{heading}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
          handleNextStep();
        }}
      >
        {({ isValid }) => (
          <Form className="info-fields">
            <div className="security-questions-section">
              <FormField
                name="securityQuestion"
                type="text"
                placeholder="Add a relevant question to help you secure your account"
                className="form-field"
              />
              <FormField
                name="securityAnswer"
                type="text"
                placeholder="Your answer"
                className="form-field"
              />
            </div>
            <button
              type="submit"
              className={`button ${!isValid && "disabled"}`}
              disabled={!isValid}
            >
              Next
            </button>
            <div className="last-btn">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="back-button"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="not-now-button"
              >
                Not now
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default SecureYourAccount;
