import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';


export default function ListingPage() {
  const [name, setName] = useState('')
  const [isbnNumber, setIsbnNumber] = useState('')
  const [price, setPrice] = useState('')
  const [coverPic, setCoverPic] = useState('')

  const firebase = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.handleCreateNewListing(name, isbnNumber, price, coverPic)
  }

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" placeholder="Enter book name" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control type="text" placeholder="Enter ISBN number" value={isbnNumber} onChange={e => setIsbnNumber(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control type="file" onChange={e => setCoverPic(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}
