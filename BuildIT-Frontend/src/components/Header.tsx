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

export default function Header({ isNavbarOpen, toggleNavbar }: { isNavbarOpen: boolean, toggleNavbar: () => void }) {

  const { t } = useTranslation();

  return (
    <header className='h-full bg-bgPrimary flex flex-col justify-between'>
      <div className="">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-8" alt="BuildIT logo" />
            <h1 className="text-2xl text-primary ml-2 font-bold">BUILD<span className="text-secondary">IT</span></h1>
          </Link>
          <ChevronLeftIcon onClick={()=>{toggleNavbar()}} className="w-4 h-4 cursor-pointer" />
        </div>


        <div className={`transition-opacity duration-300 ${isNavbarOpen ? "opacity-100" : "opacity-0"}`}>
          <div className="w-40 border-b border-bgSecondary mb-2 mx-auto"></div>
      
          <div className="flex justify-between items-center px-4 py-2">
            <span>{t('Your projects')}</span>
            <PlusIcon className="w-4 h-4" />
          </div>
          <nav>
            {projects && projects.length > 0 && projects.map((project) => (
              <div key={project.tagname} className="flex flex-col px-4 py-1">
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
                    <div key={board.board_name} className="ps-6 py-0.5">
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
      </div>
      <div className="p-4">
        <div className="w-40 border-b border-bgSecondary mb-5 mx-auto"></div>
        <div className="w-12 h-12 rounded-full bg-bgPrimary border-2 border-bgSecondary flex justify-center items-center cursor-pointer text-sm">
          MB
        </div>
      </div>
    </header>
  );
}
