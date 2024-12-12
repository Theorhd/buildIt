import { Outlet, useParams } from "react-router-dom";

export default function Project() {

    const { project_tagname } = useParams();

    return (
        <div>
            <h1>{project_tagname}</h1>
            <Outlet />
        </div>
    )
}