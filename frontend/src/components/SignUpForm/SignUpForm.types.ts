export interface FormState {
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

export enum FormActionType {
  HANDLE_INPUT_DATA = "handle_input_data",
  SET_VALIDATION_ERROR = "set_validation_error",
  SET_SUBMITTED = "set_submitted",
}

interface HandleInputData {
  type: FormActionType.HANDLE_INPUT_DATA;
  field: keyof FormState["inputData"];
  payload: string;
  error: string;
}

interface SetValidationError {
  type: FormActionType.SET_VALIDATION_ERROR;
  payload: FormState["validationErrors"];
}

interface SetSubmitted {
  type: FormActionType.SET_SUBMITTED;
}

export type FormAction = HandleInputData | SetValidationError | SetSubmitted;
