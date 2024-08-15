import jwt from "jsonwebtoken";
import getEnvVar from "./getEnvVar";

const ACCESS_TOKEN_EXPIRATION_TIME = "1h";
const REFRESH_TOKEN_EXPIRATION_TIME = "7d";

const createTokens = (username: string, id: string) => {
  const accessToken = jwt.sign({ username, id }, getEnvVar("SECRET"), {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
  const refreshToken = jwt.sign({ username, id }, getEnvVar("SECRET"), {
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
  });

  return { accessToken, refreshToken };
};

export default createTokens;
