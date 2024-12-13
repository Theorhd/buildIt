import { ChevronDownIcon, UserPlusIcon, PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Board {
    board_name: string;
}

interface Project {
    project_name: string;
    tagname: string;
    boards: Array<Board>;
}

export default function ProjectLink({project}: { project: Project }) {

    const [isProjectLinkOpen, setIsProjectLinkOpen] = useState<boolean>(true);

    const toggleProjectLink = () => {
        setIsProjectLinkOpen(!isProjectLinkOpen);
    };

  return (
    <div key={project.tagname} className="flex flex-col px-4 py-1">
        <div className="flex justify-between">
            <div className="flex items-center gap-1">
                {isProjectLinkOpen ? 
                    <ChevronDownIcon onClick={toggleProjectLink} className="w-3 h-3 cursor-pointer" />
                    :
                    <ChevronRightIcon onClick={toggleProjectLink} className="w-3 h-3 cursor-pointer" />
                }
            
                <NavLink
                    to={`/${project.tagname}`}
                    className={({ isActive }) => (isActive ? "text-secondary hover:text-secondary" : "text-primary hover:text-primary")}
                >
                    {project.project_name}
                </NavLink>
            </div>
            <div className="flex items-center gap-1">
                <UserPlusIcon className="w-4 h-4 cursor-pointer" title="Add an user" />
                <PlusIcon className="w-4 h-4 cursor-pointer" title="Create new board"/>
            </div>
        </div>
        {isProjectLinkOpen && project.boards &&
        project.boards.length > 0 &&
        project.boards.map((board) => (
            <div key={board.board_name} className="ps-6 py-0.5">
                <NavLink
                to={`/${project.tagname}/${board.board_name}`}
                className={({ isActive }) => (isActive ? "font-normal text-secondary hover:text-secondary" : "font-normal text-primary hover:text-primary")}
                >
                    {board.board_name}
                </NavLink>
            </div>
        ))}
    </div>
  )
}