import { Container, Button, Modal, Form, Toast } from 'react-bootstrap'
import { useState, useEffect } from 'react';

import { BASE_URL } from '../pages/Home';
import axios from 'axios';

import BookingPostCard from './BookingPostCard';

export default function Bookings({ email }) {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("null");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [duration, setDuration] = useState(0);
    const [phoneNum, setPhoneNum] = useState("");
    const [room, setRoom] = useState(null);
    const [rooms, setRooms] = useState([]);

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        //get all room types for adding new booking
        axios.get(`${BASE_URL}/roomtypes`)
            .then((response) => setRooms(response.data.data))
            .catch((error) => console.log(error));

        //get all upcoming bookings
        axios.post(`${BASE_URL}/bookings/upcoming`, {
            "user_email": email
        })
            .then((response) => setBookings(response.data.data))
            .catch((error) => console.error(error));

    }, [email, bookings])

    const handleCloseToast = () => setShowToast(false);

    const handleAddBooking = (e) => {
        e.preventDefault();
        const checkTime = new Date(`${date}T${time}`)
        if (checkTime >= Date.now()) {
            const data = {
                title,
                description,
                date,
                start_time: time,
                duration,
                phone_number: phoneNum,
                user_email: email,
                room_id: room
            }
            axios.post(`${BASE_URL}/bookings`, data)
                .then((response) => console.log(response.data))
                .catch((error) => console.error(error));

            //reset all values
            setTitle("");
            setDescription("");
            setDate(null);
            setTime(null);
            setDuration(0);
            setPhoneNum("");
            setRoom(null);

            //close new booking modal
            setShowModal(false);

            //successful message
            setMessage("New Booking created successfully");
        } else {
            setMessage("Schedule not available")
        }
        setShowModal(false);
        setShowToast(true);
    }

    return (
        <>
            <Container>
                <Button style={{ backgroundColor: '#D9B99B', border: '#D9B99B', color: 'black' }} onClick={() => setShowModal(true)}><strong>+ New Booking</strong></Button>
                <br />
                <BookingPostCard bookings={bookings} />
            </Container>

            <Modal
                show={showModal}
                size='lg'
                onHide={() => setShowModal(false)}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bookings Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddBooking}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type='time'
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Duration(hours)</Form.Label>
                            <Form.Control
                                type="number"
                                value={duration}
                                min={1}
                                max={6}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={phoneNum}
                                onChange={(e) => setPhoneNum(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Room Types</Form.Label>
                            <Form.Select value={room} onChange={(e) => setRoom(e.target.value)} required>
                                <option value="" selected></option>
                                {rooms.map((room, index) => {
                                    return <option key={index} value={room.id}>{room.type}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Modal.Footer>
                            <Button type='submit'>
                                Confirm Booking
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <Toast
                show={showToast}
                onClose={handleCloseToast}
                animation={true}
                className='mt-2'
            >
                <Toast.Header>Message</Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </>
    )
}