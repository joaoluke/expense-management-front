import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import "./index.css";

import ExpensesContextProvider from "./contexts/Expense";
import LoginContextProvider from "./contexts/Login";

const mdTheme = createTheme({
  palette: {
    mode: "dark",
  },
  
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={mdTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <LoginContextProvider>
          <ExpensesContextProvider>
            <CssBaseline />
            <App />
          </ExpensesContextProvider>
        </LoginContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </BrowserRouter>
);
