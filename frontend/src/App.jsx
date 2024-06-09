import LoginForm from "./components/loginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NoteList from "./components/NoteList";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppContext } from "./context/AppContext";

function App() {
  const { noteFormRef } = useAppContext();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NoteList noteFormRef={noteFormRef} />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
