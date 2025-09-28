import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css'

export default function App() {


  function Layout() {
    return (
      <>
        <Navbar style={{ backgroundColor: '#faebd7' }}>
          <Container>
            <Navbar.Brand href='/landing'><strong>Office Fusion</strong></Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Bookings</Nav.Link>
              <Nav.Link>Rooms</Nav.Link>
              <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet />
      </>

    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='landing' element={<LandingPage />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}