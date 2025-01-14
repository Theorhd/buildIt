import ProjectLink from "./ProjectLink";
import {getProjectsFromToken, acceptInvitaion, declineInvitation} from "../../utils/api_router";
import { ProjectInterface } from "../../utils/interfaces";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useEffect pour récupérer les projets
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjectsFromToken();
        setProjects(fetchedProjects);
        console.log(fetchedProjects);
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
        {projects.pending_projects && projects.pending_projects.length > 0 && projects.pending_projects.map((project) => (
          <div className="p-2 m-3 bg-bgSecondary rounded-lg drop-shadow">
            <p className="text-lg">{project.name}</p>
            <button className="bg-secondary rounded p-2 text-sm font-bold drop-shadow" onClick={ () => { acceptInvitaion(project.id); window.location.reload(); } }>Accept</button>
            <button className="bg-red-700 rounded ml-2 p-2 text-sm font-bold drop-shadow" onClick={ () => { declineInvitation(project.id); window.location.reload(); } }>Reject</button>
          </div>
        ))}
        {projects.active_projects && projects.active_projects.length > 0 && projects.active_projects.map((project) => (
          <ProjectLink project={project} key={project.tagname}/>
        ))}
    </nav>
  )
}