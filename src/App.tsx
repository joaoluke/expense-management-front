import { Route, Routes, Navigate } from "react-router-dom";

import { defaultsHeadersAxios } from "./services/connection";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  function checkAuthentication() {
    const token = localStorage.getItem("token");
    return { haveToken: token !== null, token };
  }

  function PrivateRoute({ children }) {
    const auth = checkAuthentication();
    if (auth.haveToken) {
      defaultsHeadersAxios(auth.token);
      return <>{children}</>;
    }
    return <Navigate to="/login" />;
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
