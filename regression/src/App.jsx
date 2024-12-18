import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from '../pages/layout'
import './App.css'
import Home from '../pages/home'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
        
    </>
  )
}

export default App
