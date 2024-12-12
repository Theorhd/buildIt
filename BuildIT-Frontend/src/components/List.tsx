import { useState } from "react";
import "../styles/List.css";

export default function List() {
  const [list, setList] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setList([...list, task]);
      setTask("");
    }
  };

  return (
    <div className="list">
      <div id="list-title" className="pb-4">
        <h2 className=" text-secondary font-montserrat">My List</h2>
      </div>
      <form className="list-add-task" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="list-input"
        />
        <button type="submit" className="btn-comp">
          Add Task
        </button>
      </form>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
