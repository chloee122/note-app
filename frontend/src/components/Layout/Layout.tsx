import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutWrapper,
  Main,
  NavBar,
  Logo,
  LoginButton,
  Footer,
} from "../styles/Layout.styled";
import useTopScroll from "../../hooks/useTopScroll";

function Layout() {
  const navigate = useNavigate();
  const scrolled = useTopScroll();

  return (
    <LayoutWrapper>
      <NavBar $scrolled={scrolled}>
        <Logo>Jotly</Logo>
        <LoginButton onClick={() => navigate("/auth")}>Log In</LoginButton>
      </NavBar>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <div>Privacy Policy</div>
        <div>Terms and Conditions</div>
      </Footer>
    </LayoutWrapper>
  );
}

export default Layout;
