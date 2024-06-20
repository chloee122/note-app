import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import StyledHeader from "./styles/Header.styled";
import AppContainer from "./styles/AppContainer.styled";

function Layout() {
  return (
    <AppContainer>
      <StyledHeader>
        <h1>Note App</h1>
      </StyledHeader>
      <Notification />
      <Outlet />
      <Footer />
    </AppContainer>
  );
}

export default Layout;
