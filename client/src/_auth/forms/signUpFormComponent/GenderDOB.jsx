import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import FormField from "../../../components/formfield/FormField";
import "../../../styles/signupComponentStyles/basicInfo.scss";

const GenderDOB = ({
  initialValues,
  validationSchema,
  handleSubmit,
  handleNextStep,
  handlePreviousStep,
  heading,
  direction,
}) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
    key: day,
    value: day,
  }));
  const months = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
    key: month,
    value: month,
  }));
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  ).map((year) => ({
    key: year,
    value: year,
  }));

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
        {({ isSubmitting, errors, values }) => (
          <Form className="info-fields">
            <div className="info-row">
              <label>Date of Birth</label>
              <div className="date-of-birth">
                <FormField
                  control="select"
                  name="day"
                  placeholder="Day"
                  options={days}
                />
                <FormField
                  control="select"
                  name="month"
                  placeholder="Month"
                  options={months}
                />
                <FormField
                  control="select"
                  name="year"
                  placeholder="Year"
                  options={years}
                />
              </div>
            </div>
            <FormField
              control="select"
              name="gender"
              placeholder="Gender"
              options={[
                { key: "Male", value: "Male" },
                { key: "Female", value: "Female" },
                { key: "Custom", value: "Custom" },
              ]}
            />
            <button
              type="submit"
              className={`button ${
                isSubmitting ||
                Object.keys(errors).length ||
                !values.day ||
                !values.month ||
                !values.year ||
                !values.gender
                  ? "disabled"
                  : ""
              }`}
              disabled={
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                !values.day ||
                !values.month ||
                !values.year ||
                !values.gender
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
    </motion.div>
  );
};

export default GenderDOB;
