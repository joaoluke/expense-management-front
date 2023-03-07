import { createContext, useContext, ReactNode, useState } from "react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { API } from "../services/connection";

type PropsExpensesProviders = {
  children: ReactNode;
};

const ExpensesContext = createContext({} as any);

const ExpensesContextProvider = ({ children }: PropsExpensesProviders) => {
  const [expensesToBePaid, setExpensesToBePaid] = useState<any[]>([]);
  const [expensesPaid, setExpensesPaid] = useState<any[]>([]);

  const formatDate = (date) => {
    return {
      month: format(date, "LLLL", { locale: ptBR }), 
      value: format(date, "L", { locale: ptBR }),
    };
  };

  const [currentMonth, setCurrentMonth] = useState(formatDate(new Date()));

  const getExpenses = async () => {
    const { value } = currentMonth;
  
    const response = await API.get("expenses/", {
      params: {
        month: value,
      },
    });
  
    setExpensesToBePaid(response.data.expenses_to_pay);
    setExpensesPaid(response.data.expenses_paid);
  };

  const changeExpensesToBePaid = (value) => {
    setExpensesToBePaid(value);
  };

  const changeExpensesPaid = (value) => {
    setExpensesPaid(value);
  };

  return (
    <ExpensesContext.Provider
      value={{
        expensesToBePaid,
        expensesPaid,
        getExpenses,
        changeExpensesPaid,
        changeExpensesToBePaid,
        currentMonth
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => {
  return useContext(ExpensesContext);
};

export default ExpensesContextProvider;
