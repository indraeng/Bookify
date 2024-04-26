import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import { Button, Form } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';


export default function BookDetailPage() {
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    const [qty, setQty] = useState(1);

    const firebase = useFirebase();
    const params = useParams();
    // console.log('params', params.bookId)

    //load book data when the component mount
    useEffect(() => {
        firebase.getBookById(params.bookId)
            .then(value => setData(value.data()))
    }, [])

    //load cover pic when the data state become not null
    useEffect(() => {
        if (data) {
            firebase.getImageURL(data.coverPic).then(url => {
                setURL(url)
            })
        }
    })

    // console.log('data', data)

    const placeOrder = async () => {
        const reuslt = await firebase.placeOrder(params.bookId,qty)
        console.log('order placed', reuslt)
    }

    if (data == null) return <h2>Loading...</h2>
    return (
        <div className='container mt-3'>
            <h1>{data.name}</h1>
            <img src={url} alt='cover pic' width='400px' height='250px' style={{ borderRadius: '10px' }} />
            <h3>Details</h3>
            <p>Price : Rs. {data.price}</p>
            <p>ISBN Number. {data.isbn}</p>
            <h3>Owner Details</h3>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder='Enter Quantity' value={qty} onChange={e => setQty(e.target.value)} />
            </Form.Group>
            <Button variant='success' onClick={placeOrder}>Buy Now</Button>
        </div>
    )

}
