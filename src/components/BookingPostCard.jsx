import { Card } from 'react-bootstrap';

export default function BookingPostCard({ bookings }) {

    return (
        <>
            {bookings.map((booking, index) => {
                const bookingDate = new Date(booking.date);
                return (
                    <Card key={index} className='mt-3'>
                        <Card.Body>
                            <Card.Title>{booking.title}</Card.Title>
                            <Card.Subtitle>{booking.description}</Card.Subtitle>
                            <Card.Text>
                                <br />
                                <strong>Date:</strong> {bookingDate.toLocaleDateString()}
                                <br />
                                <strong>Time:</strong> {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                                <br />
                                <br />
                                <small>Contact Information: {booking.phone_number}</small>
                                <br />
                                <strong>Room Type: {booking.type}</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </>
    )
}