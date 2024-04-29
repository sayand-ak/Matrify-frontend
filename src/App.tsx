import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserRoutes } from './routes/userRoutes/UserRoutes';
import "./App.css"

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path='/user/*' element={<UserRoutes/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App
