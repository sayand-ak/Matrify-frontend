import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserRoutes } from './routes/userRoutes/UserRoutes';
import { AdminRoutes } from './routes/adminRoutes/AdminRoutes';

import "./App.css"
import { SocketProvider } from './context/socketContext';


function App() {
  
  


  return (
    
    <>
    <SocketProvider>
      <Router>
          <Routes>
              <Route path='/*' element={<UserRoutes/>} />
              <Route path='/admin/*' element={<AdminRoutes/>} />
          </Routes>
      </Router>
    </SocketProvider>
    </>
  )
}

export default App
