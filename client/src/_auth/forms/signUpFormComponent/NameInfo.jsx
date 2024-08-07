import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import FormField from "../../../components/formfield/FormField";
import "../../../styles/signupComponentStyles/basicInfo.scss";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NameInfo = ({
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
      className="basic-info"
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
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="info-fields">
            <input
              type="hidden"
              name="accountType"
              value={initialValues.accountType}
            />
            <FormField
              control="input"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <FormField
              control="input"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <button
              type="submit"
              className={`button ${
                isSubmitting ||
                Object.keys(errors).length ||
                !values.firstName ||
                !values.lastName
                  ? "disabled"
                  : ""
              }`}
              disabled={
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                !values.firstName ||
                !values.lastName
              }
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
      <button className="back-button" onClick={handlePreviousStep}>
        Back
      </button>
      <div className="social-signups">
        <button className="button facebook-login">
          <FontAwesomeIcon icon={faFacebook} /> Continue with Facebook
        </button>
        <button className="button google-login">
          <FontAwesomeIcon icon={faGoogle} /> Continue with Google
        </button>
      </div>
    </motion.div>
  );
};

export default NameInfo;
