const validateFormField = (
  field: string,
  value: string,
  password: string
) => {
  let error = "";

  if (field === "name") {
    if (!value.trim()) {
      error = "Name is required";
    } else if (value.trim().length < 3) {
      error = "Name must be longer than 3 characters";
    }
  }

  if (field === "email") {
    if (!value.trim()) {
      error = "Email is required";
    }
  }

  if (field === "username") {
    if (!value.trim()) {
      error = "Username is required";
    } else if (value.trim().length < 6) {
      error = "Username must be longer than 6 characters";
    }
  }

  if (field === "password") {
    if (!value.trim()) {
      error = "Password is required";
    } else if (value.trim().length < 6) {
      error = "Password must be longer than 6 characters";
    }
  }

  if (field === "confirmPassword") {
    if (!value.trim()) {
      error = "Confirm password is required";
    } else if (!password || value !== password) {
      error = "Password does not match";
    }
  }

  return error;
};

export default validateFormField;
