import {
    ChevronDownIcon,
    UserPlusIcon,
    PlusIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "../Tooltip";
import { ProjectInterface } from "../../utils/interfaces";
import InviteModale from "../modale/InviteModale";
import { addUserToProject, addNewBoard } from "../../utils/api_router";
import NewBoardModale from "../modale/NewBoardModale";

export default function ProjectLink({
    project,
}: {
    project: ProjectInterface;
}) {
    const [isProjectLinkOpen, setIsProjectLinkOpen] = useState<boolean>(true);

    const toggleProjectLink = () => {
        setIsProjectLinkOpen(!isProjectLinkOpen);
    };

    const [inviteModaleOpen, setInviteModale] = useState(false);
    const [projectId, setProjectId] = useState<string>("");

    const [newBoardModaleOpen, setNewBoardModale] = useState(false);
    const [boardId, setBoardId] = useState<string>("");

    return (
        <div key={project.tagname} className="flex flex-col px-4 py-1">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    {isProjectLinkOpen ? (
                        <ChevronDownIcon
                            onClick={toggleProjectLink}
                            className="w-3 h-3 cursor-pointer"
                        />
                    ) : (
                        <ChevronRightIcon
                            onClick={toggleProjectLink}
                            className="w-3 h-3 cursor-pointer"
                        />
                    )}

                    <NavLink
                        to={`/${project.tagname}`}
                        state={{ project: project }}
                        className={({ isActive }) =>
                            isActive
                                ? "text-secondary hover:text-secondary font-semibold"
                                : "text-primary hover:text-primary font-semibold"
                        }
                    >
                        {project.project_name}
                    </NavLink>
                </div>
                <div className="flex items-center gap-1">
                    <Tooltip text="Invite user" position="top">
                        <UserPlusIcon
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => {
                                setInviteModale(true);
                                setProjectId(project.id);
                            }}
                        />
                    </Tooltip>

                    <Tooltip text="New board" position="top">
                        <PlusIcon
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => {
                                setNewBoardModale(true);
                                setBoardId(project.id);
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
            {isProjectLinkOpen &&
                project.boards &&
                project.boards.length > 0 &&
                project.boards.map((board) => (
                    <div key={board.board_name} className="ps-6 py-0.5">
                        <NavLink
                            to={`/${project.tagname}/${board.board_name}`}
                            state={{ board_id: board.id }} // Passer l'objet board en state
                            className={({ isActive }) =>
                                isActive
                                    ? "font-normal text-secondary hover:text-secondary"
                                    : "font-normal text-primary hover:text-primary"
                            }
                        >
                            {board.board_name}
                        </NavLink>
                    </div>
                ))}
            {inviteModaleOpen && (
                <InviteModale
                    onInvite={(tagname, projectId) =>
                        addUserToProject(projectId, tagname)
                    }
                    onClose={() => setInviteModale(false)}
                    projectId={projectId}
                />
            )}
            {newBoardModaleOpen && (
                <NewBoardModale
                    onNewBoardCreation={(projectId, boardName) =>
                        addNewBoard(projectId, boardName)
                    }
                    onClose={() => setNewBoardModale(false)}
                    projectId={boardId}
                />
            )}
        </div>
    );
}
