import axios from "axios";
import { User } from "../common/internal";

interface SignUpInfo {
  username: string;
  email: string;
  name: string;
  password: string;
}

interface SignUpResponse {
  data: User;
}

const baseUrl = "api/users/sign-up";

export const create = async (data: SignUpInfo): Promise<User> => {
  const response: SignUpResponse = await axios.post(baseUrl, data);
  return response.data;
};
