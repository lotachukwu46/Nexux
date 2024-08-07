import React from "react";
import { Formik, Form } from "formik";
import FormField from "../../../components/formfield/FormField";
import PictureUpload from "../../../components/formfield/PictureUplode";

const ProfilePictureAndBio = ({
  initialValues,
  validationSchema,
  handleSubmit,
  handleNextStep,
  handlePreviousStep,
  heading,
}) => {
  return (
    <div className="profile-picture-and-bio">
      <h2>{heading}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="info-fields">
            <PictureUpload name="profilePicture" />
            <FormField name="bio" type="text" placeholder="Bio" />
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

export default ProfilePictureAndBio;
