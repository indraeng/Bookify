import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(firebase)
        if (firebase.isLoggedIn) {
            //navigate to home
            navigate('/')
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('signin up a user ....')
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        console.log('successful');
        console.log('result', result);
    }
    return (
        <div className='container mt-5'>
            <h2>Register Page</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    )
}
