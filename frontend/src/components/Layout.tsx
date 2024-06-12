import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";

function Layout() {
  return (
    <div>
      <h1>Note App</h1>
      <Notification  />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
