import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, SideMenu, ButtonAdd, ModalAdd, Navbar } from "./components";

import { useExpensesContext } from "./contexts/Expense";

const data = [
  {
    id: "item-1",
    content: "Item-1",
  },
  {
    id: "item-2",
    content: "Item-2",
  },
  {
    id: "item-3",
    content: "Item-3",
  },
  {
    id: "item-4",
    content: "Item-4",
  },
];

const data1 = [
  {
    id: "item-5",
    content: "Item-5",
  },
  {
    id: "item-6",
    content: "Item-6",
  },
  {
    id: "item-7",
    content: "Item-7",
  },
  {
    id: "item-8",
    content: "Item-8",
  },
  {
    id: "item-9",
    content: "Item-9",
  },
];

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [items, setItems] = useState<any>([]);
  const [itemsFull, setItemsFull] = useState<any>([]);

  const {
    getExpenses,
    expensesToBePaid,
    expensesPaid,
    changeExpensesPaid,
    changeExpensesToBePaid,
    getColor,
  } = useExpensesContext();

  console.log(expensesToBePaid, "expensesToBePaid");

  useEffect(() => {
    getExpenses();
    getColor()
    setItems(data);
    setItemsFull(data1);
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!result.destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = expensesToBePaid;
    let complete = expensesPaid;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    console.log(active, complete, "ACTIVE");
    changeExpensesToBePaid(active);
    changeExpensesPaid(complete);
  };

  return (
    <div className="flex min-h-screen w-screen dark:bg-gray-900">
      <ButtonAdd />
      <ModalAdd />
      <Navbar />
      <SideMenu />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex mt-14 ml-64 w-full justify-center">
          <Droppable droppableId="TodosList">
            {(provided, snapshot) => (
              <div
                className="w-64 bg-slate-200 rounded-lg p-3 m-5 mr-5  dark:bg-gray-700"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {expensesToBePaid.map((item: any, index: any) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          color={item.color}
                          category={item.category}
                          name={item.name}
                          value={item.value}
                          date={item.invoice_due_date}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="TodosFullList">
            {(provided, snapshot) => (
              <div
                className="w-64 bg-slate-200 rounded-lg p-3 m-5 mr-5  dark:bg-gray-700"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {expensesPaid.map((item: any, index: number) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          color={item.color}
                          category={item.category}
                          name={item.name}
                          value={item.value}
                          date={item.invoice_due_date}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
