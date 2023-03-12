import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "./App";
import "./index.css";

import ExpensesContextProvider from "./contexts/Expense";

const mdTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={mdTheme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ExpensesContextProvider>
        <App />
      </ExpensesContextProvider>
    </LocalizationProvider>
  </ThemeProvider>
);
