import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LandingPage from "./components/LandingPage/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import GlobalStyles from "./globalStyle";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";
import NoteView from "./components/NoteView/NoteView";

function App() {
  useAxiosInterceptors();

  return (
    <>
      <ToastContainer position="top-left" theme="light" />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        >
          <Route
            path="/notes/:noteId"
            element={
              <ProtectedRoute>
                <NoteView />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
