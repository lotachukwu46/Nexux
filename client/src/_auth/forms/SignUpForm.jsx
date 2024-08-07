import React, { useState } from "react";
import "../../styles/signUpForm.scss";
import AccountTypeSelection from "./signUpFormComponent/AccountTypeSelection";
import NameInfo from "./signUpFormComponent/NameInfo";
import GenderDOB from "./signUpFormComponent/GenderDOB";
import ContactInfo from "./signUpFormComponent/ContactInfo";
import AddressInfo from "./signUpFormComponent/AddressInfo";
import SecureYourAccount from "./signUpFormComponent/SecureYourAccount";
import ProfilePictureAndBio from "./signUpFormComponent/ProfilePictureAndBio";
import Confirmation from "./signUpFormComponent/Confirmation";
import PhoneValidation from "./signUpFormComponent/PhoneValidation";
import PaymentInfo from "./signUpFormComponent/PaymentInfo";
import ProgressBar from "../../components/progressBar/ProgressBar";
import AccountInfo from "./signUpFormComponent/AccountInfo";
import {
  basicInfoSchema,
  genderDOBSchema,
  contactInfoSchema,
  accountInfoSchema,
  secureYourAccountSchema,
} from "./signUpFormComponent/validationshema";
import { motion } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const initialValues = {
  accountType: "",
  firstName: "",
  lastName: "",
  day: "",
  month: "",
  year: "",
  gender: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  password: "",
  securityQuestion: "",
  securityAnswer: "",
  confirmPassword: "",
  confirmationCode: "",
  profilePicture: null,
  bio: "",
  buyerPreference: "",
  storeName: "",
  storeDescription: "",
};

const stripePromise = loadStripe(
  "pk_test_51PewydRpS7suJuGpPdsHk6g180iBSaOxPxzsfTlkrlie6twA1xiZoHRGPwOrMgu9VDITc6nf9duSgAg3Tsr7zKuX003kLai6Qe"
);

const SignUpForm = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formValues, setFormValues] = useState(() => {
    const savedValues = localStorage.getItem("signUpFormValues");
    return savedValues ? JSON.parse(savedValues) : initialValues;
  });

  const handleFormChange = (values) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, ...values };
      localStorage.setItem("signUpFormValues", JSON.stringify(updatedValues));
      return updatedValues;
    });
  };

  const handleNextStep = () => {
    setDirection(1);
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setDirection(-1);
    setStep((prevStep) => prevStep - 1);
  };

  const handleSendCode = (values) => {
    console.log("Sending confirmation code to:", values.phone);
    handleNextStep();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    handleFormChange(values);
    console.log(values);
    localStorage.removeItem("signUpFormValues");
    localStorage.removeItem("formValues.accountType");
    setSubmitting(false);
  };

  const getDynamicHeading = () => {
    switch (formValues.accountType) {
      case "seller":
        return "Sign Up to Sell Products";
      case "buyer":
        return "Sign Up to Buy Products";
      default:
        return "Sign Up";
    }
  };

  const getStepComponent = () => {
    switch (step) {
      case 0:
        return (
          <AccountTypeSelection
            accountType={formValues.accountType}
            handleAccountTypeChange={(e) =>
              handleFormChange({ accountType: e.target.value })
            }
            handleNextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <NameInfo
            initialValues={formValues}
            handleSubmit={handleSubmit}
            validationSchema={basicInfoSchema}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading="What is your name?"
            direction={direction}
          />
        );
      case 2:
        return (
          <AccountInfo
            initialValues={formValues}
            validationSchema={accountInfoSchema}
            handleSubmit={handleSubmit}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading={getDynamicHeading()}
          />
        );
      case 3:
        return (
          <GenderDOB
            initialValues={formValues}
            handleSubmit={handleSubmit}
            validationSchema={genderDOBSchema}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading="How old are you?"
            direction={direction}
          />
        );
      case 4:
        return (
          <SecureYourAccount
            initialValues={formValues}
            validationSchema={secureYourAccountSchema}
            handleSubmit={handleSubmit}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading="Help us secure your account"
          />
        );
      case 5:
        return (
          <ContactInfo
            initialValues={formValues}
            validationSchema={contactInfoSchema}
            handleSubmit={handleSubmit}
            handleNextStep={handleNextStep}
            handleSendCode={handleSendCode}
            handlePreviousStep={handlePreviousStep}
            heading="How can we contact you?"
          />
        );
      case 6:
        return (
          <PhoneValidation
            initialValues={formValues}
            validationSchema={basicInfoSchema}
            handleSubmit={handleSubmit}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading="Confirm your identity"
          />
        );
      case 7:
        return (
          <AddressInfo
            initialValues={formValues}
            validationSchema={basicInfoSchema}
            handleSubmit={handleSubmit}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading={getDynamicHeading()}
          />
        );
      case 8:
        return (
          <Elements stripe={stripePromise}>
            <PaymentInfo
              initialValues={formValues}
              handleSubmit={handleSubmit}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              heading="Payment Information"
            />
          </Elements>
        );
      case 9:
        return (
          <ProfilePictureAndBio
            initialValues={formValues}
            validationSchema={basicInfoSchema}
            handleSubmit={handleSubmit}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            heading={getDynamicHeading()}
          />
        );
      case 10:
        return <Confirmation />;
      default:
        return null;
    }
  };

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
        {getStepComponent()}
      </motion.div>
      <ProgressBar step={step} totalSteps={10} />
    </div>
  );
};

export default SignUpForm;
