import { SignupFormState } from "../common/form.types";
import { LoginFormState } from "../common/form.types";
import validateFormField from "./validateFormField";

type FormState = SignupFormState | LoginFormState;

const validateForm = (
  formInputData: FormState["inputData"]
): FormState["validationErrors"] => {
  const errors: FormState["validationErrors"] = {};
  (Object.keys(formInputData) as (keyof FormState["inputData"])[]).forEach(
    (key) => {
      let error = "";
      error = validateFormField(
        key,
        formInputData[key],
        formInputData.password
      );
      if (error) errors[key] = error;
    }
  );

  return errors;
};

export default validateForm;
