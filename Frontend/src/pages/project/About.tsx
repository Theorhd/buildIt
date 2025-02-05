import Markdown from "../../components/Markdown";
import { useLocation } from "react-router-dom"

export default function About() {

  const project = useLocation().state.project

  return (
    <>
      {project && (
        <Markdown text={(project.markdown) ? project.markdown : ""}/>
      )}
    </>
  )
}