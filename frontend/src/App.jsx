import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../pages/layout'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
              {/* Routes Consisting of the Website */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
