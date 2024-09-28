import { useReducer } from "react";
import useAppContext from "../../hooks/useAppContext";
import Input from "../styles/shared/Input.styled";
import Button from "../styles/shared/Button.styled";
import {
  Form,
  FormField,
  SwitchFormText,
  ValidationError,
} from "../styles/shared/Form.styled";
import FormWrapper from "../styles/shared/FormWrapper.styled";
import {
  FormAction,
  FormActionType,
  LoginFormState,
} from "../../common/form.types";
import validateFormField from "../../utils/validateFormField";
import validateForm from "../../utils/validateForm";

interface LoginFormProps {
  switchForm: () => void;
}

const initialFormValue: LoginFormState = {
  inputData: {
    username: "",
    password: "",
  },
  validationErrors: {},
  isSubmitted: false,
};

const loginFormReducer = (
  state: LoginFormState,
  action: FormAction
): LoginFormState => {
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
      return {
        ...state,
        isSubmitted: true,
      };
    default:
      return state;
  }
};

function LoginForm({ switchForm }: LoginFormProps) {
  const [loginFormState, dispatch] = useReducer(
    loginFormReducer,
    initialFormValue
  );

  const { login } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginFormState.isSubmitted) {
      dispatch({ type: FormActionType.SET_SUBMITTED });
    }

    const errors = validateForm(loginFormState.inputData);
    if (Object.keys(errors).length === 0) {
      const { username, password } = loginFormState.inputData;

      login({ username, password });
    } else {
      dispatch({
        type: FormActionType.SET_VALIDATION_ERROR,
        payload: errors,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let error = "";

    if (loginFormState.isSubmitted) {
      const { name, value } = e.target;
      error = validateFormField(name, value, loginFormState.inputData.password);
    }

    dispatch({
      type: FormActionType.HANDLE_INPUT_DATA,
      field: e.target.name as keyof LoginFormState["inputData"],
      payload: e.target.value,
      error: error,
    });
  };

  return (
    <FormWrapper>
      <h2>Log in to your account</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <FormField>
            <label>Username</label>
            <Input
              data-testid="username"
              name="username"
              value={loginFormState.inputData.username}
              onChange={handleChange}
            />
          </FormField>
          <ValidationError>
            {loginFormState.validationErrors.username}
          </ValidationError>
        </div>
        <div>
          <FormField>
            <label>Password</label>
            <Input
              data-testid="password"
              name="password"
              type="password"
              value={loginFormState.inputData.password}
              onChange={handleChange}
            />
          </FormField>
          <ValidationError>
            {loginFormState.validationErrors.password}
          </ValidationError>
        </div>
        <SwitchFormText>
          Not registered? <span onClick={() => switchForm()}>Sign up here</span>
        </SwitchFormText>
        <Button $width={100} $noBorder={true} $color={"white"} type="submit">
          Log In
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;
