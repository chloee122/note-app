import { useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import {
  UserModalBackground,
  UserModalWrapper,
  UserInfo,
  LogoutBtn,
  Separator,
} from "../styles/UserModal.styled";

interface UserModalProps {
  setShowUserModal: (arg: boolean) => void;
}

function UserModal({ setShowUserModal }: UserModalProps) {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <UserModalBackground onClick={() => setShowUserModal(false)}>
      <UserModalWrapper>
        <UserInfo>{user?.name}&apos;s Jotly</UserInfo>
        <Separator></Separator>
        <LogoutBtn onClick={handleLogout}>Log Out</LogoutBtn>
      </UserModalWrapper>
    </UserModalBackground>
  );
}

export default UserModal;
