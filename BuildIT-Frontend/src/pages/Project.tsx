import { Outlet, useParams } from "react-router-dom";

export default function Project() {

    const { project_name } = useParams();

    return (
        <div>
            <h1>{project_name}</h1>
            <Outlet />
        </div>
    )
}