import { parseISO, format } from "date-fns";

import { Badge } from "./Badge";

export function Card({ name, value, category, color, date }) {
  return (
    <div className=" m-3 bg-white border border-slate-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div
        style={{ backgroundColor: color }}
        className="bg-slate-500 flex justify-center items-center  h-14 rounded-t-lg"
      >
        <h4 className="text-cyan-50">{category}</h4>
      </div>
      <div className="p-2">
        <a href="#">
          <h6 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h6>
        </a>
        <p className="min-w-24 mb-3 text-xs flex flex-col font-normal text-gray-700 dark:text-gray-400">
          Vencimento: {format(parseISO(date), "dd/MM/yyyy")}
        </p>
        <Badge />
      </div>
      <a
        href="#"
        className="w-full flex justify-center bg-blue-500 items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-b-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        R$ {value}
      </a>
    </div>
  );
}
