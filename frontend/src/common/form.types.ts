export interface SignupFormState {
  inputData: {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  validationErrors: {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
  submitted: boolean;
}

export interface LoginFormState {
  inputData: {
    username: string;
    password: string;
  };
  validationErrors: {
    username?: string;
    password?: string;
  };
  isSubmitted: boolean;
}

export enum FormActionType {
  HANDLE_INPUT_DATA = "handle_input_data",
  SET_VALIDATION_ERROR = "set_validation_error",
  SET_SUBMITTED = "set_submitted",
}

interface HandleInputDataAction {
  type: FormActionType.HANDLE_INPUT_DATA;
  field: keyof SignupFormState["inputData"];
  payload: string;
  error: string;
}

interface SetValidationErrorAction {
  type: FormActionType.SET_VALIDATION_ERROR;
  payload: SignupFormState["validationErrors"];
}

interface SetSubmittedAction {
  type: FormActionType.SET_SUBMITTED;
}

export type FormAction =
  | HandleInputDataAction
  | SetValidationErrorAction
  | SetSubmittedAction;
