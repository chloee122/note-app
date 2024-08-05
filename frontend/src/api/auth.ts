import axios from "axios";
import type { LoginInFormData, SignUpFormData } from "../common/api.types";
import type { User } from "../common/internal";

const baseUrl = "api/auth";

export const login = async (logInFormData: LoginInFormData): Promise<User> => {
  const response = await axios.post<User>(baseUrl, logInFormData);
  return response.data;
};

export const createUser = async (signUpFormData: SignUpFormData): Promise<User> => {
  const response = await axios.post<User>(`${baseUrl}/sign-up`, signUpFormData);
  return response.data;
};