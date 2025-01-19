import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import About from "./pages/project/About";
import Features from "./pages/project/Features";
import Statistics from "./pages/project/Statistics";
import Team from "./pages/project/Team";
import Diagrams from "./pages/project/Diagrams";
import Board from "./pages/project/Board";
import Settings from "./pages/project/Settings";
import Account from "./pages/Account";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route publique */}
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />

                {/* Route privée */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="/:project_tagname" element={<Project />}>
                        <Route index element={<About />} />
                        <Route path="features" element={<Features />} />
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="diagrams" element={<Diagrams />} />
                        <Route path="team" element={<Team />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    <Route
                        path="/:project_tagname/:board_name"
                        element={<Board />}
                    />
                    <Route path="/account/" element={<Account />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
