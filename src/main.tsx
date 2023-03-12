import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import "./index.css";

import ExpensesContextProvider from "./contexts/Expense";

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={mdTheme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ExpensesContextProvider>
        <CssBaseline />
        <App />
      </ExpensesContextProvider>
    </LocalizationProvider>
  </ThemeProvider>
);
