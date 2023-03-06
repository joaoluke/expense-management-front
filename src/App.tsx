import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, SideMenu } from "./components";

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
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  ...draggableStyle,
});

const App = () => {
  const [items, setItems] = useState([]);
  const [itemsFull, setItemsFull] = useState([]);

  useEffect(() => {
    setItems(data);
    setItemsFull(data1);
  }, []);

  const onDragEnd = (result) => {
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
    let active = items;
    let complete = itemsFull;
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

    // const reorderedItems = reorder(
    //   items,
    //   result.source.index,
    //   result.destination.index
    // );

    setItemsFull(complete);
    setItems(active);
  };

  return (
    <div className="flex w-screen dark:bg-gray-900">
      <SideMenu />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex ml-64 w-full justify-center">
          <Droppable droppableId="TodosList">
            {(provided, snapshot) => (
              <div
                className="bg-slate-200 rounded-lg p-3 m-5 mr-5  dark:bg-gray-700"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item: any, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card snapshot={snapshot} />
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
                className="bg-slate-200 rounded-lg p-3 m-5 mr-5  dark:bg-gray-700"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemsFull.map((item: any, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card />
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

// <div className="p-5 grid grid-cols-2 gap-4 bg-gray-900 h-screen">
//   <div className="p-5 bg-slate-800 rounded-xl">
//     <Card />
//   </div>
//   <div className="p-5 bg-slate-800 rounded-xl">
//     <Card />
//   </div>
// </div>
