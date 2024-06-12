import useAppContext from "../hooks/useAppContext";

function Notification() {
  const { errorMessage } = useAppContext();
  if (!errorMessage) {
    return null;
  }

  return <div className="error">{errorMessage}</div>;
}

export default Notification;
