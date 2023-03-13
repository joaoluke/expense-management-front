import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  function checkAuthentication() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  function PrivateRoute({ children }) {
    const auth = checkAuthentication();
    return auth ? <>{children}</> : <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
