import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../../styles/signInForm.scss";
import FormField from "../../components/formfield/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Loader from "../../components/loader/Loader";
import axios from "axios";

const SignInForm = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false, // Add rememberMe to initialValues
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    setTimeout(() => {
      setSubmitting(false); // Simulate async submission
    }, 2000); // 2 seconds delay for demo purposes
  };

  return (
    <motion.div
      className="sign-in-form"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Log in to Nexux</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormField name="email" type="email" placeholder="Email" />
            <FormField name="password" type="password" placeholder="Password" />

            {/* Remember Me Field */}
            <div className="remember-me">
              <Field type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <motion.button
              type="submit"
              className="button"
              disabled={isSubmitting}
              whileHover={{ scale: 1.007 }}
            >
              {isSubmitting ? <Loader /> : "Continue"}
            </motion.button>
            <div className="forgot-password-link">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
          </Form>
        )}
      </Formik>

      <hr />

      <motion.div
        className="social-login"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          className="button google-login"
          whileHover={{ scale: 1.007 }}
        >
          <FontAwesomeIcon icon={faGoogle} /> Continue with Google
        </motion.button>
        <motion.button
          className="button facebook-login"
          whileHover={{ scale: 1.007 }}
        >
          <FontAwesomeIcon icon={faFacebook} /> Continue with Facebook
        </motion.button>
      </motion.div>

      <motion.p
        className="login-link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </motion.p>
    </motion.div>
  );
};

export default SignInForm;
