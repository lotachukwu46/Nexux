import * as Yup from "yup";

// Validation Schema for AccountType
export const accountTypeSchema = Yup.object().shape({
  accountType: Yup.string().required("Account type is required"),
});

// Validation Schema for BasicInfo
export const basicInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

// Validation Schema for GenderDOB
export const genderDOBSchema = Yup.object().shape({
  day: Yup.number().required("Day is required").min(1, "Invalid day").max(31, "Invalid day"),
  month: Yup.number().required("Month is required").min(1, "Invalid month").max(12, "Invalid month"),
  year: Yup.number().required("Year is required").min(1900, "Invalid year").max(new Date().getFullYear(), "Invalid year"),
  gender: Yup.string().required("Gender is required"),
});

// Validation Schema for ContactInfo
export const contactInfoSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .required("Phone number is required"),
});

// Additional schemas if needed
export const additionalInfoSchema = Yup.object().shape({
  buyerPreference: Yup.string().required("Buyer preference is required"),
  storeName: Yup.string().required("Store name is required"),
  storeDescription: Yup.string().required("Store description is required"),
});

export const addressInfoSchema = Yup.object().shape({
});

export const accountInfoSchema = Yup.object().shape({
  accountType: Yup.string().required("Account type is required"),
  username: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Confirm password is required"),
});

export const secureYourAccountSchema = Yup.object().shape({
  securityQuestion: Yup.string().required("Security question is required"),
  securityAnswer: Yup.string().required("Security answer is required"),
});

export const phoneValidationSchema = Yup.object().shape({
});

export const ProfilePictureAndBio = Yup.object().shape({
 
}); 