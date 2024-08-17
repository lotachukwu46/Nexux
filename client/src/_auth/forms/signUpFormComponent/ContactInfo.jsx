import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../../styles/signupComponentStyles/phoneInput.scss";
import FormField from "../../../components/formfield/FormField";
import "../../../styles/signupComponentStyles/contactInfo.scss";
import { getCountryCode } from "../../../utils/Geolocation";

const ContactInfo = ({
  initialValues,
  validationSchema,
  handleSubmit,
  handleNextStep,
  handlePreviousStep,
  heading,
  direction,
}) => {
  const [defaultCountry, setDefaultCountry] = useState("us");

  useEffect(() => {
    const fetchCountryCode = async () => {
      const countryCode = await getCountryCode();
      setDefaultCountry(countryCode);
    };

    fetchCountryCode();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 1 ? 1000 : -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 1 ? -1000 : 1000 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="contact-info"
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
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form className="info-fields">
            <Field name="phone">
              {({ field }) => (
                <PhoneInput
                  country={defaultCountry}
                  value={field.value}
                  onChange={(phone) => setFieldValue("phone", phone)}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  containerClass="react-tel-input"
                  inputClass="form-control"
                  buttonClass="flag-dropdown"
                />
              )}
            </Field>
            <button
              type="submit"
              className={`button ${
                isSubmitting ||
                Object.keys(errors).length ||
                !values.email ||
                !values.phone
                  ? "disabled"
                  : ""
              }`}
              disabled={
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                !values.email ||
                !values.phone
              }
            >
              Send codes
            </button>
          </Form>
        )}
      </Formik>
      <button className="back-button" onClick={handlePreviousStep}>
        Back
      </button>
    </motion.div>
  );
};

export default ContactInfo;
