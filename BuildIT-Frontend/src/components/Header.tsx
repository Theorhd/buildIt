import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
        <nav>
            <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Accueil</NavLink>
        </nav>
    </header>
  )
}