import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const firebase = useFirebase();

    useEffect(() => {
        // console.log(firebase)
        if (firebase.isLoggedIn) {
            //navigate to home
            navigate('/')
        }
    }, [firebase, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login in a user ....')
        const result = await firebase.loginUserWithEmailAndPassword(email, password);
        console.log('successful');
        console.log('result', result);
    }
    return (
        <div className='container mt-5'>
            <h2>Login Page</h2>
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
                    Login
                </Button>
                <h1>OR</h1>
                <Button variant='success' onClick={firebase.signinUserWithGoogle}>Sign in with Google</Button>
            </Form>
        </div>
    )
}
