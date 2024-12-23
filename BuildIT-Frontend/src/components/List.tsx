import { useState } from "react";
import "../styles/List.css";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import ListModal from "./ListModal";

export interface Task {
  id: number;
  name: string;
  description: string;
  tags: Tag[];
  status: string;
}

export interface Tag {
  id: number;
  title: string;
  color: string;
}

interface TaskList {
  id: number;
  title: string;
  tasks: Task[];
}

export default function List() {
  const [lists, setLists] = useState<TaskList[]>([
    {
      id: Date.now(),
      title: "My List",
      tasks: [],
    },
  ]);
  const [taskValues, setTaskValues] = useState<{ [key: number]: string }>({});
  const [selectedTask, setSelectedTask] = useState<{
    task: Task;
    listId: number;
  } | null>(null);
  const statusOptions = ["To Do", "In Progress", "Done"];

  const addTask = (listId: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskValues[listId]?.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        name: taskValues[listId],
        description: "",
        tags: [],
        status: "To Do",
      };
      setLists(
        lists.map((list) =>
          list.id === listId
            ? { ...list, tasks: [...list.tasks, newTask] }
            : list
        )
      );
      setTaskValues({ ...taskValues, [listId]: "" });
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

  const updateTaskDetails = (
    listId: number,
    taskId: number,
    details: { description: string; tags: Tag[] }
  ) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, ...details } : task
              ),
            }
          : list
      )
    );
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "To Do":
        return "text-blue-500";
      case "In Progress":
        return "text-yellow-500";
      case "Done":
        return "text-secondary";
      case "Blocked":
        return "text-red-500";
    }
  };

  return (
    <div className="relative h-full flex mt-2">
      <ol className="absolute flex flex-row top-0 bottom-0 right-0 left-0 px-4 pb-6 mb-2 overflow-x-auto overflow-y-hidden select-none whitespace-nowrap">
        {lists.map((list) => (
          <li
            key={list.id}
            className="list h-full block px-2 shrink-0 self-start drop-shadow-lg whitespace-nowrap"
          >
            <div className="w-64 flex relative flex-col bg-bgPrimary rounded-md p-4 max-h-full scroll-m-2">
              <button
                onClick={() => deleteList(list.id)}
                className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
              >
                &#x2715;
              </button>

              <div id="list-title" className="flex items-center pb-4">
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

              <ol className="flex flex-col overflow-x-hidden overflow-y-auto">
                {list.tasks.map((task, taskIndex) => (
                  <li
                    className="bg-bgSecondary py-4 px-5 mb-2 rounded-md drop-shadow-lg relative cursor-pointer"
                    key={taskIndex}
                    onClick={() =>
                      setSelectedTask({
                        listId: list.id,
                        task: task,
                      })
                    }
                  >
                    <div className="pb-3">
                      {task.tags.map((tag) => (
                        <span
                          key={tag.id}
                          style={{ backgroundColor: tag.color }}
                          className="text-xs rounded-md px-2 py-1 mr-2"
                        >
                          {tag.title}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(list.id, taskIndex);
                      }}
                      className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
                    >
                      &#x2715;
                    </button>
                    <div className="flex flex-col">
                      <p className="text-center mb-5">{task.name}</p>
                      <p
                        className={`text-center text-sm uppercase ${getStatusClass(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <form
                className="list-add-task mt-4"
                onSubmit={(e) => addTask(list.id, e)}
              >
                <input
                  type="text"
                  placeholder="Add a task"
                  value={taskValues[list.id] || ""}
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
          </li>
        ))}

        <div className="h-full block shrink-0 self-start px-2">
          <button
            onClick={addNewList}
            className="list w-64 h-24 drop-shadow-lg flex items-center justify-center gap-2 whitespace-nowrap bg-bgPrimary rounded-md"
          >
            <PlusCircleIcon className="size-8 mr-5 text-secondary" />
            <p className="text-secondary font-bold text-md md:text-l">
              Add New List
            </p>
          </button>
        </div>
      </ol>
      {selectedTask && (
        <ListModal
          task={selectedTask.task}
          onClose={() => setSelectedTask(null)}
          onSave={(details) =>
            updateTaskDetails(
              selectedTask!.listId,
              selectedTask!.task.id,
              details
            )
          }
        />
      )}
    </div>
  );
}
