import { NavLink } from "react-router-dom";
import logo from '/buildit-logo.png';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    project_name: "Projet 1",
    boards: [
      {
        board_name: "Board 1",
      },
      {
        board_name: "Board 2",
      }
    ]
  },
  {
    project_name: "Projet 2",
    boards: [
      {
        board_name: "Board 1",
      },
      {
        board_name: "Board 2",
      }
    ]
  }
]

export default function Header() {

  const { t } = useTranslation();

  return (
      <header>
        <nav>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
            <img src={logo} className="logo" alt="BuildIT logo" />
            <h1>BUILDIT</h1>
          </NavLink>
          <div className="nav-link">
            <span>{t('Your projects')}</span>
          </div>
          
          {projects && projects.length > 0 && projects.map((project) => (
            <div>
              
              {project.boards && project.boards.length > 0 && project.boards.map((board) => (
                <NavLink to={`/${board.board_name}`} className={({isActive}) => isActive ? "active" : ""}>
                  {board.board_name}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </header>
  )
}