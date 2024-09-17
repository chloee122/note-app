import useAppContext from "../../hooks/useAppContext";
import NoteList from "../NoteList/NoteList";
import NoteView from "../NoteView";
import SideMenu from "../SideMenu";
import { MainPageWrapper } from "../styles/MainPage.styled";

function MainPage() {
  const { notes } = useAppContext();

  return (
    <MainPageWrapper>
      <SideMenu />
      <NoteList notes={notes} />
      <NoteView />
    </MainPageWrapper>
  );
}

export default MainPage;
