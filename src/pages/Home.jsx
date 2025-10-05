import { Container, Row, Col, Image, Nav, Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/usersSlice';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthProvider';

import axios from 'axios';

import Bookings from '../components/Bookings'
import History from '../components/History';
import BookingPostCard from '../components/BookingPostCard';

export const BASE_URL = `https://bookings-api-zimo.vercel.app`;
export default function Home() {
    const { currentUser } = useContext(AuthContext);

    const [bookings, setBookings] = useState([]);
    const [history, setHistory] = useState(false);

    const [filter, setFilter] = useState(false);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [date, setDate] = useState(null);

    const user = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBookings = () => {
        setFilter(false);
        setHistory(false);
        setBookings(true);
    }

    const handleHistory = () => {
        setFilter(false);
        setBookings(false);
        setHistory(true);
    }

    const handleFilter = (date) => {
        setFilter(true);
        setBookings(false);
        setHistory(false);
        axios.get(`${BASE_URL}/bookings/${date}/${currentUser?.email}`)
            .then((response) => {
                console.log(response.data)
                setFilteredBookings(response.data.data)
            })
            .catch((error) => console.error(error));

        //reset date value
        setDate(null);
    }

    useEffect(() => {
        if (!currentUser?.uid) {
            navigate('/login');
        } else {
            dispatch(fetchUser({ userId: currentUser?.uid }));
        }

    }, [currentUser, dispatch, navigate])

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col sm={2}>
                        <Image src={user ? user.users.imageUrl : 'src/assets/blank-user.png'} style={{ height: '180px', width: '180px' }} roundedCircle />
                    </Col>
                    <Col sm={4}>
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

                <Card className='mb-3 w-50' bg='light'>
                    <Card.Body>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            handleFilter(date);
                        }}>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className='w-50'
                                />
                                <Button size='sm' className='mt-2' type='submit'>Filter</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

                {bookings && <Bookings email={currentUser?.email} />}
                {history && <History email={currentUser?.email} />}
                {filter && <BookingPostCard bookings={filteredBookings} />}
            </Container >
        </>
    )
}