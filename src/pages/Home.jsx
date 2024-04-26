import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function HomePage() {
  const [books, setBooks] = useState([])
  //make a instance context
  const firebase = useFirebase();

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs))
  }, [firebase])
  return (
    <div className='container mt-5'>
      <h1>List books here</h1>
      <CardGroup>
        {
          books.map((book) => <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
        }
      </CardGroup>
    </div>
  )
}
