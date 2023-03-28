import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { DateTime } from "luxon";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import API from "../services/connection";
import { getCookie } from "../functions/GET_COOCKIE";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

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

  const [loading, setLoading] = useState(false);

  const [expenseToDelete, setExpenseToDelete] = useState();

  const [category, setCategory] = useState([]);

  const [formData, setFormData] = useState({
    expense: "",
    value: "",
    date: null,
    category: "",
    status: "",
    month: null,
  });

  const monthCurrent = new Date().getMonth() + 1;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    // console.log(date, "DATE")
    setFormData({ ...formData, date });
  };

  function generateMonthList() {
    let date = new Date();
    let monthsOfYear = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    let currentMonthGenerate = date.getMonth();

    return monthsOfYear.map((month, index) => {
      return { month: month, value: String(index + 1) };
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const categoryAndColor = category.find(
      (item) => item.name === formData.category
    );
    const data = {
      name: formData.expense,
      value: formData.value,
      invoice_due_date: format(new Date(formData.date), "yyyy-MM-dd"),
      category: categoryAndColor.name,
      color: categoryAndColor.color,
      column:
        formData.status ||
        (Number(formData.month) < Number(monthCurrent) ? "PAID" : "TO_PAY"),
      month_reference: formData.month || null,
      payment_status: "PENDING",
    };
    createExpenses(data);
  };

  const [openModal, setOpenModal] = useState<any>({
    delete: false,
    create: false,
  });

  const editExpense = (expense) => {
    // console.log(expense, "expense", new Date(expense.invoiceDueDate).toISOString())
    setOpenModal({
      delete: false,
      create: true,
    });

    const dateTime = DateTime.fromISO(expense.invoiceDueDate);

    const muiXDate = {
      M2: dateTime.month,
      $D: dateTime.day,
      $H: dateTime.hour,
      $L: dateTime.locale,
      $M: dateTime.minute,
      $W: dateTime.weekday,
      $d: dateTime.toJSDate(),
      $m: dateTime.month - 1,
      $ms: dateTime.millisecond,
      $s: dateTime.second,
      $u: undefined,
      $x: {},
      $y: dateTime.year,
    };

    setFormData({
      expense: expense.name,
      value: expense.value,
      date: muiXDate,
      category: expense.category,
      status: expense.column,
      month: expense,
    });
  };

  const closeToast = () => {
    setToastIsOpen({
      open: false,
      message: "",
    });
  };

  function getDataPorMes(mes) {
    let date = new Date();
    let mesesDoAno = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    let mesIndex = mesesDoAno.indexOf(mes);

    if (mesIndex !== -1) {
      date.setMonth(mesIndex);
      date.setFullYear(new Date().getFullYear());
      return date;
    } else {
      return null;
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
    if (!value) {
      getExpenses(null);
      setCurrentMonth({ month: null, value: null });
      return;
    }
    getExpenses(formatDate(getDataPorMes(value)));
    setCurrentMonth(formatDate(getDataPorMes(value)));
  };

  const getExpenses = async (value = currentMonth) => {
    setLoading(true);
    // const { value } = currentMonth;

    const response = await API.get("expenses/", {
      params: {
        month: value ? value.value : "null",
      },
    });

    setTotalPaid(response.data.total_paid || 0);
    setTotalToPay(response.data.total_to_pay || 0);
    changeExpensesToBePaid(response.data.expenses_to_pay);
    changeExpensesPaid(response.data.expenses_paid);
    setLoading(false);
  };

  // useEffect(() => {
  //   getExpenses();
  // }, [currentMonth]);

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
      return;
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

  const data = {
    username: "admin",
    password: "1234",
  };

  const csrfToken = Cookies.get("csrftoken");

  const login = async () => {
    await axios
      .post("http://localhost:8000/login/", {
        username: "admin",
        password: "1234",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
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
        formData,
        createExpenses,
        loading,
        closeToast,
        changeMonth,
        changeExpensesPaid,
        changeExpensesToBePaid,
        currentMonth,
        totalPaid,
        changeModalDelete,
        totalToPay,
        login,
        monthCurrent,
        handleChange,
        handleDateChange,
        generateMonthList,
        handleSubmit,
        expenseToDelete,
        changeModalCreate,
        editExpense,
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
