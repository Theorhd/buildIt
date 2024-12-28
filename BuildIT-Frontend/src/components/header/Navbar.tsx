import ProjectLink from "./ProjectLink";
import {getProjectsFromToken, refresh} from "../../utils/api_router";


try {
  const lprojects = await getProjectsFromToken();
  console.log(lprojects);
} catch (error) {
  console.error(error);
}

const projects = [
    {
      project_name: "Projet 1",
      tagname: "project1",
      boards: [
        {
          board_name: "Board 1",
        },
        {
          board_name: "Board 2",
        },
      ],
    },
    {
      project_name: "Projet 2",
      tagname: "project2",
      boards: [
        {
          board_name: "Board 1",
        },
        {
          board_name: "Board 2",
        },
      ],
    },
];

export default function Navbar() {
  return (
    <nav>
        {projects && projects.length > 0 && projects.map((project) => (
          <ProjectLink project={project} key={project.tagname}/>
        ))}
    </nav>
  )
}