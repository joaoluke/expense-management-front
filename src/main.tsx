import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import ExpensesContextProvider from "./contexts/Expense";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ExpensesContextProvider>
    <App />
  </ExpensesContextProvider>
);
