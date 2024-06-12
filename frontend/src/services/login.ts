import axios from "axios";
const baseUrl = "api/login";

type credentialsType = {
  username: string
  password: string
}


const login = async (credentials: credentialsType) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};


export default { login };