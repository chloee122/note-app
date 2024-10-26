import { Outlet } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import NoteList from "../NoteList/NoteList";
import SideMenu from "../SideMenu/SideMenu";
import { MainPageWrapper } from "../styles/MainPage.styled";

function MainPage() {
  const { notes } = useAppContext();

  return (
    <MainPageWrapper>
      <SideMenu />
      <NoteList notes={notes} />
      <Outlet />
    </MainPageWrapper>
  );
}

export default MainPage;
