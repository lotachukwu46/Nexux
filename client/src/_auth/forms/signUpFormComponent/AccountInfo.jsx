import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import FormField from "../../../components/formfield/FormField";
import "../../../styles/signupComponentStyles/accountInfo.scss";
import "../../../styles/global.scss";

const AccountInfo = ({
  initialValues,
  handleSubmit,
  validationSchema,
  handleNextStep,
  handlePreviousStep,
  heading,
  direction,
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 1 ? 1000 : -1000 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction === 1 ? -1000 : 1000 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="account-info"
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
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="info-fields">
          <FormField
            name="username"
            type="text"
            placeholder="Create a userName"
          />
          <FormField
            name="password"
            type="password"
            placeholder="Create a strong password"
          />
          <FormField
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
          />
          <button
            type="submit"
            className={`button ${
              isSubmitting || !isValid || !dirty ? "disabled" : ""
            }`}
            disabled={isSubmitting || !isValid || !dirty}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
          <button className="back-button" onClick={handlePreviousStep}>
            Back
          </button>
        </Form>
      )}
    </Formik>
  </motion.div>
);

export default AccountInfo;
