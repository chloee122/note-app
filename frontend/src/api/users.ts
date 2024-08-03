import axios from "axios";
import { SignUpData } from "../common/api.types";
import { SignUpResponse, User } from "../common/internal";

const baseUrl = "api/users/sign-up";

export const create = async (data: SignUpData): Promise<User> => {
  const response: SignUpResponse = await axios.post(baseUrl, data);
  return response.data;
};
