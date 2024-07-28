const getEnvVar = (varName: string) => {
  return process.env[varName] || "";
};

export default getEnvVar;
