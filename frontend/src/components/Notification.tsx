import { useAppContext } from "../context/AppContext";

function Notification() {
  const { errorMessage } = useAppContext();
  if (!errorMessage) {
    return null;
  }

  return <div className="error">{errorMessage}</div>;
}

export default Notification;
