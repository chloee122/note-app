import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";

function Layout({ message }) {
  return (
    <div>
      <h1>Note App</h1>
      <Notification message={message} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
