import { Container, Row, Col, Image, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const [showModal, setShowModal] = useState(false);

    //submit login form
    const handleLogin = (e) => {
        e.preventDefault();
        //todo
    };

    //submit sign up form
    const handleSignUp = () => {
        //todo
    }

    //sign up form
    function SignUp(props) {
        return (
            <Modal
                {...props}
                size='lg'
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setPhoneNum(e.target.value)}
                            value={phoneNum}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        handleSignUp();
                        props.onHide();
                    }}>
                        Create Account
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    //login form
    return (
        <>
            <Container className='d-flex justify-content-center align-items-center' fluid>
                <Row className='mt-5 mb-5 bg-light rounded-5 p-3'>
                    <Col xs={6}>
                        <Image src='/src/assets/logo.png' style={{ height: '170px', width: '300px' }} />
                        <Form onSubmit={handleLogin}>
                            <h2 className='mt-0 mb-3'>Login Account</h2>
                            <Form.Group className='mt-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </Form.Group>

                            <div className='d-grid'>
                                <Button type='submit' className='mt-5'>Login</Button>
                            </div>

                            <p className='mt-3'>
                                Do not have an account? <span onClick={() => setShowModal(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }}><strong>Create here!</strong></span>
                            </p>
                        </Form>
                    </Col>
                    <Col xs={6}>
                        <Image src='/src/assets/coworking-wallpaper.jpg' style={{ height: '600px', width: '600px' }} />
                    </Col>
                </Row>
            </Container>

            <SignUp
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </>
    )
}