import ProjectLink from "./ProjectLink";
import {getProjectsFromToken} from "../../utils/api_router";
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
        {projects.active_projects && projects.active_projects.length > 0 && projects.active_projects.map((project) => (
          <ProjectLink project={project} key={project.tagname}/>
        ))}
    </nav>
  )
}