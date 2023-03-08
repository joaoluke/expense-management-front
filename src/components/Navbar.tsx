import { useExpensesContext } from "../contexts/Expense";

export const Navbar = () => {
    const {totalPaid, totalToPay}= useExpensesContext()
  return (
    <nav className="w-screen p-4 h-14 bg-gray-100 fixed ml-64 border-l-2 border-slate-400 dark:bg-gray-800">
      <label className="text-gray-200">Despesas a pagar: </label>
      <span className="bg-red-500 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-gray-100">
        R$ {totalToPay}
      </span>
      <label className="text-gray-200">Despesas pagas: </label>
      <span className="bg-red-500 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-gray-100">
        R$ {totalPaid}
      </span>
    </nav>
  );
};
