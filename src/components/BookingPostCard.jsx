import { Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { BASE_URL } from '../pages/Home';

import UpdateBooking from './UpdateBooking'
import Notification from './Notification';
import axios from 'axios';

export default function BookingPostCard({ bookings }) {
    const [showModal, setShowModal] = useState(false);
    const [editBooking, setEditBooking] = useState(null);

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleCloseToast = () => setShowToast(false);

    const handleOpenModal = (booking) => {
        setEditBooking(booking);
        setShowModal(true);
    }
    const handleCloseModal = () => setShowModal(false);

    //create current date object
    const currentDate = new Date();

    const handleDeleteBooking = (id) => {
        axios.delete(`${BASE_URL}/bookings/${id}`)
            .then((response) => {
                setMessage(response.data.message)
            })
            .catch((error) => console.error(error));

        setShowToast(true);
    }

    return (
        <>
            {bookings ? bookings.map((booking, index) => {
                //[22, 10, 00]
                const [hours, minutes, seconds] = booking.start_time.split(':');

                //date without timestamp
                const bookingDate = new Date(booking.date);

                //set timestamp into date (combining date and time strings)
                bookingDate.setHours(hours, minutes, seconds);

                return (
                    <>
                        <Card key={index} className='mt-3'>
                            <Card.Body>
                                <Card.Title>{booking.title}</Card.Title>
                                <Card.Subtitle>{booking.description}</Card.Subtitle>
                                <Card.Text>
                                    <br />
                                    <strong>Date:</strong>{bookingDate.toLocaleDateString()}
                                    <br />
                                    <strong>Time:</strong> {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                                    <br />
                                    <br />
                                    <small>Contact Information: {booking.phone_number}</small>
                                    <br />
                                    <strong>Room Type: {booking.type}</strong>
                                </Card.Text>
                                <Card.Footer>
                                    <Badge bg={bookingDate >= currentDate ? 'warning' : 'success'}>{bookingDate >= currentDate ? 'Upcoming' : 'Completed'}</Badge>
                                    <Button className='m-1' onClick={() => handleOpenModal(booking)}>
                                        <i class="bi bi-pencil-fill"></i>
                                    </Button>
                                    <Button variant='danger' onClick={() => handleDeleteBooking(booking.id)} className='m-1'>
                                        <i class="bi bi-trash-fill"></i>
                                    </Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>

                    </>
                )
            }) : <p className='mt-3'>No bookings found</p>}

            {/* updating booking modal */}
            {showModal && (
                <UpdateBooking show={showModal} booking={editBooking} handleClose={handleCloseModal} />
            )}

            <Notification message={message} showToast={showToast} handleCloseToast={handleCloseToast} />

        </>
    )
}