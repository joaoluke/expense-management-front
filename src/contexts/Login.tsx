import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

import API, { defaultsHeadersAxios } from "../services/connection";

type PropsExpensesProviders = {
  children: ReactNode;
};

const LoginContext = createContext({} as any);

const LoginContextProvider = ({ children }: PropsExpensesProviders) => {
  const [expensesToBePaid, setExpensesToBePaid] = useState<any[]>([]);
  const navigate = useNavigate();

  const login = async (username, password) => {
    await API.post("login/", {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        authentication(response.data.access);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  const authentication = (token) => {
    defaultsHeadersAxios(token);
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  return (
    <LoginContext.Provider
      value={{
        login,
        logout
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export default LoginContextProvider;
