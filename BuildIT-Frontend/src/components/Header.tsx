import { Link, NavLink } from "react-router-dom";
import logo from '/buildit-logo.png';
import { useTranslation } from 'react-i18next';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'

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

export default function Header() {

  const { t } = useTranslation();

  return (
      <header className="bg-bgPrimary h-screen p-4">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-10" alt="BuildIT logo" />
              <h1 className="text-2xl text-primary ml-2 font-bold">BUILD<span className="text-secondary">IT</span></h1>
            </Link>
            <ChevronLeftIcon className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-center">
            <span>{t('Your projects')}</span>
            <PlusIcon className="w-4 h-4" />
          </div>
          <nav>
          {projects && projects.length > 0 && projects.map((project) => (
            <div key={project.tagname} className="flex flex-col py-1">
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <ChevronDownIcon className="w-3 h-3" />
                  <NavLink
                    to={`/${project.tagname}`}
                    className={({ isActive }) => (isActive ? "text-secondary hover:text-secondary" : "text-primary hover:text-primary")}
                  >
                    {project.project_name}
                  </NavLink>
                </div>
                <div className="flex items-center gap-1">
                  <UserPlusIcon className="w-4 h-4" />
                  <PlusIcon className="w-4 h-4" />
                </div>
              </div>
              {project.boards &&
                project.boards.length > 0 &&
                project.boards.map((board) => (
                  <div key={board.board_name} className="ps-6">
                    <NavLink
                      to={`/${project.tagname}/${board.board_name}`}
                      className={({ isActive }) => (isActive ? "font-normal text-secondary hover:text-secondary" : "font-normal text-primary hover:text-primary")}
                    >
                      {board.board_name}
                    </NavLink>
                  </div>
                ))}
            </div>
          ))}
          </nav>
      </div>
    </header>
  );
}
