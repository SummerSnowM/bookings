import { Container, Row, Col, Image, Nav } from 'react-bootstrap'
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';

export default function Home() {
    const BASE_URL = `https://f15abb20-13e0-45b3-8ffd-8c40cea5bb9e-00-3gahccidclukm.sisko.replit.dev`;
    const [image, setImage] = useState(null);
    const { currentUser } = useContext(AuthContext);

    axios.get(`${BASE_URL}/images/${currentUser.email}`)
        .then((response) => setImage(`${BASE_URL}${response.data.data.filepath}`))
        .catch((error) => console.log(error));
    console.log(image)

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col sm={2}>
                        <Image src={!image ? 'src/assets/blank-user.png' : image} style={{ height: '180px', width: '180px' }} roundedCircle />
                    </Col>
                    <Col sm={4}>
                        {/* replace to username */}
                        <h3>Welcome back! {currentUser.email}</h3>
                        <p>{currentUser.email}</p>
                    </Col>
                    <hr className='mt-3' />
                </Row>
                <Row>
                    <Nav fill className='justify-content-center' variant="underline">
                        <Nav.Item>
                            <Nav.Link className='text-dark'><strong>Bookings</strong></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='text-dark'><strong>History</strong></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr className='mt-3' />
                </Row>
            </Container >
        </>
    )
}