import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../pages/layout'
import Home from '../pages/home'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
              {/* Routes Consisting of the Website */}
              <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
