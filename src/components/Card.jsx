import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function BookCard(props) {
    const [url, setUrl] = useState(null);

    const firebase = useFirebase()
    const navigate = useNavigate()

    useEffect(() => {
        firebase.getImageURL(props.coverPic).then(url => {
            setUrl(url)
        })
    }, [])


    return (
        <div>
            <Card style={{ width: '18rem', margin: '15px' }}>
                <Card.Img variant="top" src={url} style={{ height: '320px' }} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>This book is sold by {props.displayName},ISBN number:{props.isbn} and this book costs {props.price} rupees</Card.Text>
                    <Button variant="primary" onClick={()=>navigate(props.link)}>View</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
