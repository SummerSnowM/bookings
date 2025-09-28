import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function App() {


  function Layout() {
    return (
      <>
        <Navbar bg='light'>
          <Container>
            <Navbar.Brand>Office Fusion</Navbar.Brand>
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
          <Route path='login' element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}