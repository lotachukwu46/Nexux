import React from "react";
import { Formik, Form } from "formik";
import FormField from "../../../components/formfield/FormField";

const SellerSpecificInfo = ({
  initialValues,
  validationSchema,
  handleSubmit,
  handleNextStep,
  handlePreviousStep,
  heading,
}) => {
  return (
    <div className="seller-specific-info">
      <h2>{heading}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="info-fields">
            <FormField name="storeName" type="text" placeholder="Store Name" />
            <FormField
              name="storeDescription"
              type="text"
              placeholder="Store Description"
            />
            <button
              type="submit"
              onClick={handleNextStep}
              className={`button ${isSubmitting ? "disabled" : ""}`}
              disabled={isSubmitting}
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
      <button className="back-button" onClick={handlePreviousStep}>
        Back
      </button>
    </div>
  );
};

export default SellerSpecificInfo;
