import { Row, Col, Container, Image } from 'react-bootstrap';

import landingWallpaper from '../assets/landing-wallpaper.jpg'

export default function LandingPage() {
    return (
        <>
            <Container className='mt-5 pt-5' >
                <Row className='g-5 align-items-center'>
                    <Col sm={6}>
                        <Image src={landingWallpaper} className='rounded-5' style={{ width: '500px' }} />
                    </Col>
                    <Col sm={6}>
                        <h1 className='mt-5'>Work Smart, Work Comfortably, Stay Productive!</h1>
                        <p className='mt-3'>We believe that a good working environment motivates everybody and improve productivity, hence this co-working space booking plans to serve that purpose!</p>
                        <p className='mt-2'>This space will be opened 24 hours everyday in order to provide you flexibility to freely schedule your working time!</p>
                    </Col>
                </Row>

                <Row className='mt-5 text-center' sm={12}>
                    <Col sm={4}>
                        <i className='bi bi-laptop-fill' style={{ fontSize: '60px' }}></i>
                        <p>Offers rooms of different types from meeting rooms to private rooms to suit your needs!</p>
                    </Col>
                    <Col sm={4}>
                        <i className='bi bi-bell-fill' style={{ fontSize: '60px' }}></i>
                        <p>Notifications to remind you a day earlier before the booking date!</p>
                    </Col>
                    <Col sm={4}>
                        <i className='bi bi-calendar-plus-fill' style={{ fontSize: '60px' }}></i>
                        <p>Create and updating bookings to suit yours and team's schedule!</p>
                    </Col>
                </Row>
            </Container>
        </>
    )

}