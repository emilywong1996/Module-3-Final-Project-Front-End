// npm run serve-json to run the fake database (it should be on a different port from the frontend server)
// npm start for initiating frontend server, using React

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { GraphsPage } from './components/GraphsPage'
import { InputDataPage } from './components/InputDataPage'


function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/graphs'>Graphs</Link>
              </li>
              <li>
                <Link to='/input-data'>Input Data</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/graphs' element={<GraphsPage/>}/>
            <Route path='/input-data' element={<InputDataPage/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App;