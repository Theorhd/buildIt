import { useState } from "react";
import "../styles/List.css";

export default function List() {
  const [list, setList] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");
  const [Tags, setTags] = useState<string>("Tags");

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setList([...list, task]);
      setTask("");
    }
  };

  return (
    <div className="list w-64 mt-6 drop-shadow-lg">
      <div id="list-title" className="pb-4">
        <input
          className=" text-secondary font-montserrat list-input"
          placeholder="List title"
        />
      </div>
      <ul>
        {list.map((item, index) => (
          <li
            className="bg-bgSecondary py-4 px-5 mb-2 rounded-md drop-shadow-lg"
            key={index}
          >
            <div className="flex flex-col">
              <div className="bg-blue-500 py-2 w-max px-2 mb-2 text-xs drop-shadow-lg">
                {Tags}
              </div>
              <p className="text-center mb-5">{item}</p>
              <p className="text-center text-sm text-secondary uppercase">
                In progress
              </p>
            </div>
          </li>
        ))}
      </ul>
      <form className="list-add-task mt-4" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="list-input text-primary"
        />
        <button type="submit" className="drop-shadow-lg pl-6 btn-comp text-xs">
          Add Task
        </button>
      </form>
    </div>
  );
}
