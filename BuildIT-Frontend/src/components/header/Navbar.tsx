import ProjectLink from "./ProjectLink";
import {getProjectsFromToken, acceptInvitaion, declineInvitation} from "../../utils/api_router";
import { ProjectInterface } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Tooltip from "../Tooltip";

export default function Navbar() {

  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isPendingOpen, setIsPendingOpen] = useState<boolean>(false);

  const togglePending = () => {
      setIsPendingOpen(!isPendingOpen);
  };

  // Utilisation de useEffect pour récupérer les projets
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjectsFromToken();
        setProjects(fetchedProjects);
      } catch (err) {
        setError("Failed to load projects : " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Le tableau vide [] garantit que l'effet est exécuté une seule fois

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <nav>
        {projects.pending_projects && (
          <div className="px-4 py-1">
            <div className="flex justify-between items-center cursor-pointer" onClick={togglePending}>
              <div className="flex items-center gap-1">
                {isPendingOpen ? 
                    <ChevronDownIcon className="w-3 h-3" />
                    :
                    <ChevronRightIcon className="w-3 h-3" />
                } 
                <span className="text-primary hover:text-primary font-semibold">Invitation pending</span>
              </div>
              {projects.pending_projects.length > 0 && (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
              )}
            </div>
            {isPendingOpen && projects.pending_projects.length > 0 && projects.pending_projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between bg-bgSecondary rounded-md px-4 py-1 my-2">
                <div className="flex justify-between items-center">
                  <p className="">{project.name}</p>
                </div>
                <div className="flex items-center gap-1">
                <Tooltip text="Accept invitation" position="top">
                  <CheckIcon  onClick={ () => { acceptInvitaion(project.id); window.location.reload(); } } className="w-7 h-7 p-1 text-secondary rounded-md cursor-pointer hover:bg-bgSecondary" />
                </Tooltip>
                <Tooltip text="Decline invitation" position="top">
                  <XMarkIcon onClick={ () => { declineInvitation(project.id); window.location.reload(); } } className="w-7 h-7 p-1 text-red-600 rounded-md cursor-pointer hover:bg-bgSecondary" />
                </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
        {projects.active_projects && projects.active_projects.length > 0 && projects.active_projects.map((project) => (
          <ProjectLink project={project} key={project.tagname}/>
        ))}
    </nav>
  )
}