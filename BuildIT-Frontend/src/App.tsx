import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import NotFound from './pages/NotFound'
import Project from './pages/Project'
import About from './pages/project/About'
import Features from './pages/project/Features'
import Statistics from './pages/project/Statistics'
import Team from './pages/project/Team'
import Diagrams from './pages/project/Diagrams'
import Board from './pages/project/Board'

function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:project_tagname" element={<Project/>}>
          <Route index element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="Statistics" element={<Statistics />} />
          <Route path="Diagrams" element={<Diagrams />} />
          <Route path="team" element={<Team />} />

          <Route path=":board_name" element={<Board />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
