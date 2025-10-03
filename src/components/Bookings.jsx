import { Container, Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';

import { BASE_URL } from '../pages/Home';
import axios from 'axios';

export default function Bookings() {
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [duration, setDuration] = useState(0);
    const [phoneNum, setPhoneNum] = useState("");
    const [room, setRoom] = useState(null);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/roomtypes`)
            .then((response) => setRooms(response.data.data))
            .catch((error) => console.log(error));
    }, [])

    const handleAddBooking = (e) => {
        e.preventDefault();
        console.log(typeof(time))
        console.log(time + duration);
        // const data = {
        //     title,
        //     description,
        //     date,
        //     start_time: time,
        // }
        // axios.post(`${BASE_URL}/bookings`)
    }

    return (
        <>
            <Container>
                <Button style={{ backgroundColor: '#D9B99B', border: '#D9B99B', color: 'black' }} onClick={() => setShowModal(true)}><strong>+ New Booking</strong></Button>
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
        </>
    )
}