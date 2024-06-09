import { useAppContext } from "../context/AppContext";

function Notification() {
  const { errorMessage } = useAppContext();
  if (errorMessage === null) {
    return null;
  }

  return <div className="error">{errorMessage}</div>;
}

export default Notification;
