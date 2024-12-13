import { useState } from "react";
import "../styles/List.css";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/24/outline";

interface TaskList {
  id: number;
  title: string;
  tasks: string[];
}

export default function List() {
  const [lists, setLists] = useState<TaskList[]>([
    { id: Date.now(), title: "My List", tasks: [] },
  ]);
  const [taskValues, setTaskValues] = useState<{ [key: number]: string }>({});
  const [tags, setTags] = useState<string>("React");

  const addTask = (listId: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskValues[listId]?.trim() !== "") {
      setLists(
        lists.map((list) =>
          list.id === listId
            ? { ...list, tasks: [...list.tasks, taskValues[listId]] }
            : list
        )
      );
      setTaskValues({ ...taskValues, [listId]: "" }); // Réinitialiser l'input spécifique à cette liste
    }
  };

  const deleteTask = (listId: number, taskIndex: number) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((_, index) => index !== taskIndex),
            }
          : list
      )
    );
  };

  const addNewList = () => {
    setLists([...lists, { id: Date.now(), title: "New List", tasks: [] }]);
  };

  const deleteList = (listId: number) => {
    setLists(lists.filter((list) => list.id !== listId));
  };

  const clearTitle = (listId: number) => {
    setLists(
      lists.map((list) => (list.id === listId ? { ...list, title: "" } : list))
    );
  };

  return (
    <div className="flex gap-6">
      {lists.map((list) => (
        <div
          key={list.id}
          className="list h-full w-64 mt-6 drop-shadow-lg relative"
        >
          <button
            onClick={() => deleteList(list.id)}
            className="absolute top-4 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
          >
            &#x2715;
          </button>

          <div id="list-title" className="flex pb-4">
            <input
              className="text-secondary font-montserrat list-input"
              placeholder="List title"
              value={list.title}
              onClick={() => clearTitle(list.id)}
              onChange={(e) =>
                setLists(
                  lists.map((l) =>
                    l.id === list.id ? { ...l, title: e.target.value } : l
                  )
                )
              }
            />
            <PencilIcon className="size-4 absolute right-12" />
          </div>

          <ul>
            {list.tasks.map((task, taskIndex) => (
              <li
                className="bg-bgSecondary py-4 px-5 mb-2 rounded-md drop-shadow-lg relative cursor-pointer"
                key={taskIndex}
              >
                <button
                  onClick={() => deleteTask(list.id, taskIndex)}
                  className="absolute top-2 right-2 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
                >
                  &#x2715;
                </button>

                <div className="bg-blue-500 py-1 w-max px-2 mb-2 text-xs drop-shadow-lg">
                  {tags}
                </div>
                <div className="flex flex-col">
                  <p className="text-center mb-5">{task}</p>
                  <p className="text-center text-sm text-secondary uppercase">
                    In progress
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <form
            className="list-add-task mt-4"
            onSubmit={(e) => addTask(list.id, e)}
          >
            <input
              type="text"
              placeholder="Add a task"
              value={taskValues[list.id] || ""} // Utilisation de la valeur spécifique à cette liste
              onChange={(e) =>
                setTaskValues({ ...taskValues, [list.id]: e.target.value })
              }
              className="list-input w-full text-primary"
            />
            <button
              type="submit"
              className="drop-shadow-lg pl-6 btn-comp text-xs"
            >
              Add Task
            </button>
          </form>
        </div>
      ))}

      <button
        onClick={addNewList}
        className="list w-64 h-24 mt-6 drop-shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
      >
        <div className="flex md:flex-row flex-col">
          <PlusCircleIcon className="size-6 mr-5" />
          <p className="text-secondary text-sm md:text-md font-medium">
            Add New List
          </p>
        </div>
      </button>
    </div>
  );
}
