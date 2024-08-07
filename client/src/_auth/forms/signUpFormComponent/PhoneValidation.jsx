import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import FormField from "../../../components/formfield/FormField";
import "../../../styles/signupComponentStyles/phoneValidation.scss";

// Validation Schema
const validationSchema = Yup.object({
  emailConfirmationCode: Yup.string().required(
    "Email confirmation code is required"
  ),
  phoneConfirmationCode: Yup.string().required(
    "Phone confirmation code is required"
  ),
  agreement: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

const PhoneValidation = ({
  initialValues,
  handleSubmit,
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
    className="phone-validation"
  >
    <h2>{heading}</h2>
    <p>
      We've sent a confirmation code to your phone number and email address.
      Please enter them to confirm your identity.
    </p>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        handleNextStep();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="info-fields">
          <FormField
            name="emailConfirmationCode"
            type="text"
            placeholder="Email Confirmation Code"
          />
          <FormField
            name="phoneConfirmationCode"
            type="text"
            placeholder="Phone Confirmation Code"
          />
          <div className="agreement-section">
            <label>
              <input type="checkbox" name="agreement" />I agree to the
              <a
                href="/path-to-agreement"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className={`button ${isSubmitting || !isValid ? "disabled" : ""}`}
            disabled={isSubmitting || !isValid}
          >
            Continue
          </button>
        </Form>
      )}
    </Formik>
    <button className="back-button" onClick={handlePreviousStep}>
      Back
    </button>
  </motion.div>
);

export default PhoneValidation;
