import useAppContext from "../hooks/useAppContext";
import StyledNotification from "./styles/Notification.styled";

function Notification() {
  const { errorMessage } = useAppContext();
  if (!errorMessage) {
    return null;
  }

  return (
    <StyledNotification className="error">{errorMessage}</StyledNotification>
  );
}

export default Notification;
