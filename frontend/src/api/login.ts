import axios from "axios";
import { LoginInData } from "../common/api.types";
import { LoginResponse, User } from "../common/internal";

const baseUrl = "api/login";

const login = async (credentials: LoginInData): Promise<User> => {
  const response: LoginResponse = await axios.post(baseUrl, credentials);
  return response.data;
};

export default login;
