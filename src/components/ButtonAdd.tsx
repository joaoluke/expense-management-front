import { useExpensesContext } from "../contexts/Expense";

export const ButtonAdd = () => {
  const { changeModal } = useExpensesContext();
  return (
    <div
      onClick={() => changeModal(true)}
      className="fixed h-10 w-10 flex text-white cursor-pointer shadow-md shadow-violet-300 items-center justify-center bottom-3 right-3 rounded-full bg-violet-700 hover:bg-violet-600"
    >
      +
    </div>
  );
};
