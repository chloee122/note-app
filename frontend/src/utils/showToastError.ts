import { AxiosError } from "axios";
import { toast } from "react-toastify";

const showToastError = (
  error: unknown,
  close: undefined | false = undefined
) => {
  if (error instanceof AxiosError) {
    const message: unknown = error.response?.data.error;
    if (typeof message === "string" || message instanceof String) {
      toast.error(message, { autoClose: close });
    } else {
      toast.error(error.message, { autoClose: close });
    }
  }
};

export default showToastError;
