import { Container, Row, Col, Image, Form, Button, Modal } from 'react-bootstrap';

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate('/home');
    }, [currentUser, navigate])

    //submit login form
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    //submit sign up form
    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
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
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
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
                        <Image className='mt-3' src='/src/assets/coworking-wallpaper.jpg' style={{ maxHeight: '100%', width: '100%' }} />
                    </Col>
                </Row>
            </Container>

            {/* sign up window */}
            <Modal
                show={showModal}
                size='lg'
                onHide={() => setShowModal(false)}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSignUp}>
                        Create Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}