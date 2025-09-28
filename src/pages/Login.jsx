import { Container, Row, Col, Image, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const [showModal, setShowModal] = useState(false);

    //submit login form
    const handleLogin = (e) => {
        e.preventDefault();
        //todo
        const data = {
            username: loginUsername,
            password: loginPassword
        }

        axios.post(`https://f15abb20-13e0-45b3-8ffd-8c40cea5bb9e-00-3gahccidclukm.sisko.replit.dev/login`, data)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));

        setLoginUsername("");
        setLoginPassword("");
    };

    //submit sign up form
    const handleSignUp = () => {
        //create data body
        const data = {
            username: signUpUsername,
            password: signUpPassword,
            email,
            phoneNum
        }

        //api post data
        axios.post(`https://f15abb20-13e0-45b3-8ffd-8c40cea5bb9e-00-3gahccidclukm.sisko.replit.dev/signup`, data)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));

        //reinitialize values back to default
        setSignUpUsername('');
        setSignUpPassword('');
        setEmail('');
        setPhoneNum('');

        //close the sign up window
        setShowModal(false);
    }

    //login form
    return (
        <>
            <Container className='d-flex justify-content-center align-items-center'>
                <Row className='mt-5 mb-5 bg-light rounded-5 p-3'>
                    <Col xs={6}>
                        <Image src='/src/assets/logo.png' style={{ height: '110px', width: '210px' }} />
                        <Form onSubmit={handleLogin}>
                            <h2 className='mt-0 mb-3'>Login Account</h2>
                            <Form.Group className='mt-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    onChange={e => setLoginUsername(e.target.value)}
                                    value={loginUsername}
                                />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    onChange={e => setLoginPassword(e.target.value)}
                                    value={loginPassword}
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
                        <Image className='mt-3' src='/src/assets/coworking-wallpaper.jpg' style={{ maxHeight: '100%', width: '100%' }} />
                    </Col>
                </Row>
            </Container>

            {/* sign up window */}
            <Modal
                show={showModal}
                size='lg'
                onHide={() => setShowModal(false)}
                animation={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setSignUpUsername(e.target.value)}
                            value={signUpUsername}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            value={signUpPassword}
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
                    }}>
                        Create Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}