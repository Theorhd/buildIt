import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function Project() {

    const { project_tagname } = useParams();

    const { t } = useTranslation();

    const project = {
        name: "BuildIT",
        tagname: project_tagname,
        description: "A short description about the project",
        createdBy: "Microsoft",
        creationDate: "28/11/2024",
    }

    return (
        <>
            {project && (
                <div className="h-full">
                    <div className="mb-6">
                        <h1 className="text-6xl font-bold">{project.name}<span className="text-sm text-secondary font-medium">@{project.tagname}</span></h1>
                        <p className="font-semibold">{project.description}</p>
                        <p className="text-sm">Created by <span className="text-secondary cursor-pointer">{project.createdBy}</span> on {project.creationDate}</p>
                    </div>
                    <div className="">
                        <div className="flex gap-4 text-xs ms-4">
                            <NavLink end to={`/${project.tagname}`}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('About').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/features`}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Features').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/statistics`}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Statistics').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/diagrams`}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Diagrams').toUpperCase()}
                            </NavLink>
                            <NavLink to={`/${project.tagname}/team`}
                            className={({ isActive }) => (isActive ? "border-b-2 border-primary text-primary hover:text-primary" : "text-primary hover:text-primary")}>
                                {t('Team').toUpperCase()}
                            </NavLink>
                        </div>
                        <div className="w-full border-b border-bgPrimary mb-4 mx-auto"></div>
                    </div>
                    <div className="h-5/6 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    )
}