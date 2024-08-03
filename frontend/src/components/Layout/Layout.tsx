import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { LayoutWrapper, HeaderWrapper, OutletWrapper } from "../styles/Layout.styled";

function Layout() {
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <h1>Note App</h1>
      </HeaderWrapper>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;
