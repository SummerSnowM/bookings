import { useEffect, useState } from 'react'
import { BASE_URL } from '../pages/Home';
import axios from 'axios';

import BookingPostCard from './BookingPostCard';

export default function History({ email }) {
    const [history, setHistory] = useState([]);
    
    useEffect(() => {
        //get history bookings
        axios.get(`${BASE_URL}/bookings/${email}`)
            .then((response) => setHistory(response.data.data))
            .catch((error) => console.error(error));
    }, [email])
    console.log(history);
    return (
        <>
            <BookingPostCard bookings={history} />
        </>
    )
}