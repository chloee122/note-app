import LoginForm from "./components/LoginForm/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./components/MainPage/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import GlobalStyles from "./globalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-left" theme="light" />
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
