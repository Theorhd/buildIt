import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { ProjectInterface, UserInterface } from "../utils/interfaces";
import { useEffect, useState } from "react";
import { getProjectFromTagname, getUserFromID } from "../utils/api_router";
import { useProjectContext } from "../context/ProjectContext";

export default function Project() {

    const [project, setProject] = useState<ProjectInterface | null>(null);
    const [createByTagname, setCreateByTagname] = useState<string | null>(null);
    const [error, setError] = useState("");
    const { projectUpdated } = useProjectContext();

    const { project_tagname } = useParams();

    useEffect(() => {
        const fetchUser = async (user_id: number) => {
            try {
                await getUserFromID(user_id)
                .then((fetchedUser: UserInterface) => {
                    setCreateByTagname(fetchedUser.tagname)
                })
            } catch (err) {
                setError("Failed to load project : " + err)
            }
        }

        const fetchProject = async () => {
            try {
                await getProjectFromTagname(project_tagname)
                .then((fetchedProject) => {
                    setProject(fetchedProject);
                    fetchUser(fetchedProject.created_by)
                });
            } catch (err) {
                setError("Failed to load project : " + err);
            }
        };

        fetchProject();
    
    }, [projectUpdated, project_tagname])
    
    const { t } = useTranslation();

    return (
        <>
            {error && (
                <div>{error}</div>
            )}
            {project && (
                <div className="h-full p-16">
                    <div className="mb-6">
                        <h1 className="text-6xl font-bold font-montserrat">{project.project_name}<span className="text-sm text-secondary font-medium">@{project.tagname}</span></h1>
                        <p className="font-semibold">{project.description}</p>
                        <p className="text-sm">Created by <span className="text-secondary font-semibold cursor-pointer">@{createByTagname}</span> on {project.creation_date}</p>
                    </div>
                    <div className="mb-4">
                        <div className="flex gap-4 text-xs font-semibold ms-4">
                            <NavLink end to={`/${project.tagname}`}
                            state={{project : project}}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('About').toUpperCase()}
                            </NavLink>
                            {/* <NavLink to={`/${project.tagname}/features`}
                            state={project}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Features').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/statistics`}
                            state={project}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Statistics').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/diagrams`}
                            state={project}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Diagrams').toUpperCase()}
                            </NavLink> */}
                            <NavLink to={`/${project.tagname}/team`}
                            state={{project : project}}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Team').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/settings`}
                            state={{project : project}}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Settings').toUpperCase()}
                            </NavLink>
                        </div>
                        <div className="w-full border-b border-bgPrimary mx-auto"></div>
                    </div>
                    <div className="h-5/6 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    )
}