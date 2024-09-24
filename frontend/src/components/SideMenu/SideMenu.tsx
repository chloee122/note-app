import { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { RiExpandUpDownLine } from "react-icons/ri";
import useAppContext from "../../hooks/useAppContext";
import UserModal from "./UserModal";
import {
  NoteNavItem,
  SideMenuWrapper,
  UserName,
} from "../styles/SideMenu.styled";
import { UserSection } from "../styles/SideMenu.styled";

function SideMenu() {
  const { user } = useAppContext();
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <SideMenuWrapper>
      <UserSection onClick={() => setShowUserModal(true)}>
        <UserName>{user?.name}&apos;s Jotly</UserName>
        <RiExpandUpDownLine strokeWidth={0.3} size={16} />
      </UserSection>
      {showUserModal && <UserModal setShowUserModal={setShowUserModal} />}
      <NoteNavItem>
        <CgNotes size={20} color="#aaabab" />
        <span>Notes</span>
      </NoteNavItem>
    </SideMenuWrapper>
  );
}

export default SideMenu;
