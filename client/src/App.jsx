import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import NavbarSection from './components/NavbarSection'
import { Footer } from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import BaseLayout from './layout/BaseLayout'

function App() {


  return (
    <BrowserRouter>
      <NavbarSection />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route element={<PrivateRoute />} >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
