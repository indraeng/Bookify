import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/Card'

export default function OrdersPage() {
  const [books, setBooks] = useState([])
  const firebase = useFirebase()
  useEffect(() => {
    if(firebase.isLoggedIn)
    firebase.fetchMyBooks(firebase.user.uid)
      .then(books => setBooks(books?.docs))
  }, [firebase])
  // console.log(books)
  if(!firebase.isLoggedIn) return <h2>Please login</h2>
  // if (!books) return <h1>Books are loading ...</h1>
  return (
    <div>
      <h1>List of books that i add to sell</h1>
      {
        books.map((book) => (
          <BookCard  link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
        ))
      }
    </div>
  )
}
