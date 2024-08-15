interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const getTokens = (): Tokens => {
  const tokensJSON = localStorage.getItem("tokens");

  if (tokensJSON) {
    const { accessToken, refreshToken } = JSON.parse(tokensJSON) as Tokens;
    return { accessToken, refreshToken };
  }

  return { accessToken: "", refreshToken: "" };
};

export default getTokens;
