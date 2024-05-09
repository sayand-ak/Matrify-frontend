import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserRoutes } from './routes/userRoutes/UserRoutes';
import { AdminRoutes } from './routes/adminRoutes/AdminRoutes';

import "./App.css"


function App() {
  


  return (
    <>
      <Router>
          <Routes>
              <Route path='/user/*' element={<UserRoutes/>} />
              <Route path='/admin/*' element={<AdminRoutes/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App
