import Homepage from './Homepage.tsx'
import About from './About.tsx'
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