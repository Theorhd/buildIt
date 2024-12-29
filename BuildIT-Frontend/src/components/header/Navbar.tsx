import ProjectLink from "./ProjectLink";
import {getProjectsFromToken} from "../../utils/api_router";

const projects = await getProjectsFromToken();
console.log(projects);

export default function Navbar() {
  return (
    <nav>
        {projects && projects.length > 0 && projects.map((project) => (
          <ProjectLink project={project} key={project.tagname}/>
        ))}
    </nav>
  )
}