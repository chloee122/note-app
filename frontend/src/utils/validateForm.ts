import { FormState } from "../components/SignUpForm/SignUpForm.types";
import validateFormField from "./validateFormField";

const validateForm = (
  formInputData: FormState["inputData"]
): FormState["validationErrors"] => {
  const errors: FormState["validationErrors"] = {};
  (Object.keys(formInputData) as (keyof FormState["inputData"])[]).forEach(
    (key) => {
      let error = "";
      error = validateFormField(key, formInputData[key], formInputData.password);
      if (error) errors[key] = error;
    }
  );

  return errors;
};

export default validateForm;
