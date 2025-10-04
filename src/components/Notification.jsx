import { ToastContainer, Toast } from 'react-bootstrap';

export default function Notification({ message, showToast, handleCloseToast }) {

    return (
        <>
            <ToastContainer
                position='top-end'
                className='me-3'
                style={{ zIndex: 1 }}
            >
                <Toast
                    show={showToast}
                    onClose={handleCloseToast}
                    animation={true}
                    className='mt-2'
                >
                    <Toast.Header>Message</Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )


}