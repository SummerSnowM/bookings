import { Container, Row, Col, Image, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/usersSlice';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthProvider';

import Bookings from '../components/Bookings'
import History from '../components/History';

export const BASE_URL = `https://f15abb20-13e0-45b3-8ffd-8c40cea5bb9e-00-3gahccidclukm.sisko.replit.dev`;
export default function Home() {
    const { currentUser } = useContext(AuthContext);

    const [bookings, setBookings] = useState(true);
    const [history, setHistory] = useState(false);

    const user = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleBookings = () => {
        setHistory(false);
        setBookings(true);
    }

    const handleHistory = () => {
        setBookings(false);
        setHistory(true);
    }

    useEffect(() => {
        dispatch(fetchUser({ userId: currentUser.uid }));
    }, [currentUser, dispatch])

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col sm={2}>
                        <Image src={user ? user.users.imageUrl : 'src/assets/blank-user.png'} style={{ height: '180px', width: '180px' }} roundedCircle />
                    </Col>
                    <Col sm={4}>
                        {/* replace to username */}
                        <h3>Welcome back! {user.users.username}</h3>
                        <p>{user.users.username}@{currentUser?.email}</p>
                    </Col>
                    <hr className='mt-3' />
                </Row>
                <Row>
                    <Nav fill className='justify-content-center' variant="underline">
                        <Nav.Item>
                            <Nav.Link onClick={handleBookings} className='text-dark'><strong>Bookings</strong></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={handleHistory} className='text-dark'><strong>History</strong></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr className='mt-3' />
                </Row>

                {bookings && <Bookings email={currentUser.email} />}
                {history && <History />}
            </Container >
        </>
    )
}