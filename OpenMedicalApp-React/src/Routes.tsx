import Homepage from './pages/Homepage.tsx'
import About from './pages/About.tsx'
import { Route, Routes } from 'react-router-dom';

function pageRoutes() {
  return (
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/about" Component={About} />
      </Routes>
  )
}

export default pageRoutes;