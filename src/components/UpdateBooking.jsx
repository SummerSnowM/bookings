import axios from 'axios';
import { BASE_URL } from '../pages/Home';
import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react';

import Notification from './Notification';

export default function UpdateBooking({ booking, show, handleClose }) {
    const dateConvert = new Date(booking.date).toLocaleDateString();
    const [date, setDate] = useState(dateConvert);

    const [time, setTime] = useState(booking.start_time);
    const [duration, setDuration] = useState(booking.duration);

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleCloseToast = () => setShowToast(false);

    const handleUpdate = (id) => {
        const checkTime = new Date(`${date}T${time}`);
        
        //check if time has passed, if not passed, allow user to update
        if (checkTime >= Date.now()) {
            const data = {
                start_time: time,
                duration,
                date
            }

            axios.put(`${BASE_URL}/bookings/${id}`, data)
                .then((response) => setMessage(response.data.message))
                .catch((error) => console.error(error));
                
            //reset values
            setDate(null);
            setTime(null);
            setDuration(0);
        } else {
            setMessage('Schedule not available!');
        }
        setShowToast(true);
        //close the modal
        setTimeout(() => handleClose(), 2000);
    }

    return (
        <>
            {/* updating booking modal */}
            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>Update Booking Information</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(booking.id);
                    }}>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type='time'
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type='number'
                                min={1}
                                max={6}
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button type='submit'>
                                Update Booking
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal >

            <Notification message={message} showToast={showToast} handleCloseToast={handleCloseToast} />
        </>
    )
}