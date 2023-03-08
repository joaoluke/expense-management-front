import {
  EightIcon,
  FiveIcon,
  FourIcon,
  OneIcon,
  NineIcon,
  SevenIcon,
  SixIcon,
  TenIcon,
  ThreeIcon,
  TwoIcon,
} from "../assets";
import { useExpensesContext } from "../contexts/Expense";

export function SideMenu() {
  const { currentMonth } = useExpensesContext();
  console.log(currentMonth, "currentMonth");

  return (
    <aside
      id="separator-sidebar"
      className="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <OneIcon />
              <span className="ml-3">Janeiro</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TwoIcon />
              <span className="ml-3">Fevereiro</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={
                currentMonth.month === "março"
                  ? "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-600"
                  : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            >
              <ThreeIcon />
              <span className="ml-3">Março</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FourIcon />
              <span className="ml-3">Abril</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiveIcon />
              <span className="ml-3">Maio</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SixIcon />
              <span className="ml-3">Junho</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SevenIcon />
              <span className="ml-3">Julho</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <EightIcon />
              <span className="ml-3">Agosto</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <NineIcon />
              <span className="ml-3">Setembro</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TenIcon />
              <span className="ml-3">Outubro</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FourIcon />
              <span className="ml-3">Novembro</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FourIcon />
              <span className="ml-3">Dezembro</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
