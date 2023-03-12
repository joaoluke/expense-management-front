import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { API } from "../services/connection";
import { getCookie } from "../functions/GET_COOCKIE";

type PropsExpensesProviders = {
  children: ReactNode;
};

const ExpensesContext = createContext({} as any);

const ExpensesContextProvider = ({ children }: PropsExpensesProviders) => {
  const [expensesToBePaid, setExpensesToBePaid] = useState<any[]>([]);
  const [expensesPaid, setExpensesPaid] = useState<any[]>([]);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalToPay, setTotalToPay] = useState<number>(0);

  const [toastIsOpen, setToastIsOpen] = useState({
    open: false,
    message: "",
  });

  const [expenseToDelete, setExpenseToDelete] = useState();

  const [category, setCategory] = useState([]);

  const [openModal, setOpenModal] = useState<any>({
    delete: false,
    create: false,
  });

  const closeToast = () => {
    setToastIsOpen({
      open: false,
      message: "",
    });
  };

  function getDataPorMes(mes) {
    let date = new Date();
    let mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let mesIndex = mesesDoAno.indexOf(mes);
    
    if (mesIndex !== -1) {
      date.setMonth(mesIndex);
      date.setFullYear(new Date().getFullYear());
      return date;
    } else {
      return null; // Retorna null se o nome do mês não for encontrado no array de meses.
    }
  }

  const formatDate = (date: any) => {
    return {
      month: format(date, "LLLL", { locale: ptBR }),
      value: format(date, "L", { locale: ptBR }),
    };
  };

  const changeModalCreate = (value: boolean) => {
    setOpenModal({ ...openModal, create: value });
  };

  const changeModalDelete = (value: boolean, expense = null) => {
    if (expense) {
      setExpenseToDelete(expense);
    }
    setOpenModal({ ...openModal, delete: value });
  };

  
  const [currentMonth, setCurrentMonth] = useState(formatDate(new Date()));
  
  const changeMonth = (value) => {
    setCurrentMonth(formatDate(getDataPorMes(value)))
  }
  
  const getExpenses = async () => {
    const { value } = currentMonth;
    
    const response = await API.get("expenses/", {
      params: {
        month: value,
      },
    });

    setTotalPaid(response.data.total_paid  || 0);
    setTotalToPay(response.data.total_to_pay  || 0);
    changeExpensesToBePaid(response.data.expenses_to_pay);
    changeExpensesPaid(response.data.expenses_paid);
  };
  
  useEffect(() => {
    getExpenses()
  },[currentMonth])

  const deleteExpense = async (expense) => {
    await API.delete<any>(`expenses-list/${expense.id}/`);

    setToastIsOpen({
      open: true,
      message: "Despesa excluida com sucesso",
    });

    if (expense.column === "PAID") {
      setTotalPaid(Number(totalPaid) - Number(expense.value));
      setExpensesPaid(expensesPaid.filter((item) => item.id !== expense.id));
    } else {
      setTotalToPay(Number(totalToPay) - Number(expense.value));
      setExpensesToBePaid(
        expensesToBePaid.filter((item) => item.id !== expense.id)
      );
    }
    changeModalDelete(false);
  };

  const createExpenses = async (data: any) => {
    const response = await API.post<any>("expenses-list/", data);

    setToastIsOpen({
      open: true,
      message: "Despesa criada com sucesso",
    });

    changeModalCreate(false);


    if (response.data.month_reference !== new Date().getMonth() + 1) {
      return
    }

    if (data.column === "PAID") {
      setTotalPaid(Number(totalPaid) + Number(data.value));
      setExpensesPaid([response.data, ...expensesPaid]);
    } else {
      setTotalToPay(Number(totalToPay) + Number(data.value));
      setExpensesToBePaid([response.data, ...expensesToBePaid]);
    }
  };

  const getCategory = async () => {
    const response = await API.get("category/");
    setCategory(response.data);
  };

  const csrftoken = getCookie("csrftoken");

  const login = async () => {
    await API.post(
      "login/",
      {
        username: "admin",
        password: "1234",
      },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    );
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
        toastIsOpen,
        getExpenses,
        deleteExpense,
        createExpenses,
        closeToast,
        changeMonth,
        changeExpensesPaid,
        changeExpensesToBePaid,
        currentMonth,
        totalPaid,
        changeModalDelete,
        totalToPay,
        login,
        expenseToDelete,
        changeModalCreate,
        openModal,
        getCategory,
        category,
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
