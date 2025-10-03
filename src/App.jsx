import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import store from './store'

import { useContext } from 'react';

import { BrowserRouter, Routes, Route, Outlet, useNavigate, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { AuthProvider } from './components/AuthProvider'
import { Provider } from 'react-redux';
import { getAuth } from 'firebase/auth'
import { AuthContext } from './components/AuthProvider';

export default function App() {

  function Layout() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth();

    return (
      <>
        <Navbar style={{ backgroundColor: '#faebd7' }}>
          <Container>
            <Navbar.Brand as={Link} to='/'><strong>Office Fusion</strong></Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/home'>Home</Nav.Link>
              <Nav.Link>Bookings</Nav.Link>
              <Nav.Link>Rooms</Nav.Link>
              <Nav.Link onClick={() => {
                if (currentUser) {
                  auth.signOut()
                    .then(() => navigate('/login'))
                } else {
                  navigate('/login')
                }
              }}>{currentUser ? 'Logout' : 'Login'}</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet />
      </>

    )
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path='login' element={<Login />} />
              <Route path='home' element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}