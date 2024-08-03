import { FormState } from "../components/SignUpForm/SignUpForm.types";
import validateFormField from "./validateFormField";

const validateForm = (
  formInputData: FormState["inputData"]
): FormState["validationErrors"] => {
  const errors: FormState["validationErrors"] = {};
  (Object.keys(formInputData) as (keyof FormState["inputData"])[]).forEach(
    (key) => {
      let error = "";
      if (key === "confirmPassword") {
        error = validateFormField(
          key,
          formInputData[key],
          formInputData.password
        );
      } else {
        error = validateFormField(key, formInputData[key]);
      }
      if (error) errors[key] = error;
    }
  );

  return errors;
};

export default validateForm;
