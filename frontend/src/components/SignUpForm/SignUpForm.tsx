import { useReducer } from "react";
import useAppContext from "../../hooks/useAppContext";
import Input from "../styles/shared/Input.styled";
import Button from "../styles/shared/Button.styled";
import Form from "../styles/shared/Form.styled";
import FormWrapper from "../styles/shared/FormWrapper.styled";
import { AuthMode } from "../AuthPage/AuthPage";
import validateFormField from "../../utils/validateFormField";
import { FormAction, FormActionType, FormState } from "./SignUpForm.types";
import validateForm from "../../utils/validateForm";

interface SignUpFormProps {
  switchForm: (form: AuthMode) => void;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
  case FormActionType.HANDLE_INPUT_DATA:
    return {
      ...state,
      inputData: { ...state.inputData, [action.field]: action.payload },
      validationErrors: {
        ...state.validationErrors,
        [action.field]: action.error,
      },
    };
  case FormActionType.SET_VALIDATION_ERROR:
    return { ...state, validationErrors: action.payload };
  case FormActionType.SET_SUBMITTED:
    return { ...state, submitted: true };
  default:
    return state;
  }
};

const initialFormValue: FormState = {
  inputData: {
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  validationErrors: {},
  submitted: false,
};

type LabelText = { [key in keyof FormState["inputData"]]: string };

const labelText: LabelText = {
  name: "Name",
  email: "Email",
  username: "Username",
  password: "Password",
  confirmPassword: "Confirm Password",
};

function SignUpForm({ switchForm }: SignUpFormProps) {
  const [formState, dispatch] = useReducer(formReducer, initialFormValue);

  const { signup } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";
    if (formState.submitted) {
      error =
        name === "confirmPassword"
          ? validateFormField(name, value, formState.inputData.password)
          : validateFormField(name, value);
    }

    dispatch({
      type: FormActionType.HANDLE_INPUT_DATA,
      field: e.target.name as keyof FormState["inputData"],
      payload: e.target.value,
      error: error,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.submitted) dispatch({ type: FormActionType.SET_SUBMITTED });

    const validationErrors = validateForm(formState.inputData);

    if (Object.keys(validationErrors).length === 0) {
      const { name, email, username, password } = formState.inputData;
      signup({ name, email, username, password });
    } else {
      dispatch({
        type: FormActionType.SET_VALIDATION_ERROR,
        payload: validationErrors,
      });
    }
  };

  const formFields = (
    Object.keys(formState.inputData) as (keyof FormState["inputData"])[]
  ).map((key) => {
    let inputType;
    if (key === "email") {
      inputType = "email";
    } else if (["password", "confirmPassword"].includes(key)) {
      inputType = "password";
    }
    return (
      <div key={key}>
        <div>
          <label>{labelText[key]}</label>
          <Input
            data-testid={key}
            name={key}
            type={inputType || "text"}
            value={formState.inputData[key]}
            onChange={handleChange}
          />
        </div>
        {formState.validationErrors[key] && (
          <span>{formState.validationErrors[key]}</span>
        )}
      </div>
    );
  });

  const isFormDataValid = (
    Object.keys(
      formState.validationErrors
    ) as (keyof FormState["validationErrors"])[]
  ).every((key) => formState.validationErrors[key] === "");

  return (
    <FormWrapper>
      <h2>Create an account</h2>
      <Form onSubmit={handleSubmit}>
        {formFields}
        <p>
          Already registered?{" "}
          <span onClick={() => switchForm(AuthMode.LOGIN)}>Log in here</span>
        </p>
        <Button
          $width={100}
          $noBorder={true}
          $color={"white"}
          type="submit"
          disabled={!isFormDataValid}
        >
          Sign Up
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default SignUpForm;
