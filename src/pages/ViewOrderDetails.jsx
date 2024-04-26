import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

export default function ViewOrderDetails() {
    const params = useParams()
    const firebase = useFirebase()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        firebase.getOrders(params.bookId)
            .then(orders => setOrders(orders.docs))
    }, [])
    // console.log('orders', orders)

    if (!orders) return <h1>orders details is loading...</h1>
    return (
        <div className='container mt-5'>
            <h1>Orders</h1>
            {
                orders.map(order => {
                    const data = order.data()
                    console.log(order)
                    return (
                        <div className='container mt-5' key={order.id} style={{border:'1px solid',padding:'5px'}}>
                            <h3>Order By: {data.displayName}</h3>
                            <h6>User Email: {data.userEmail}</h6>
                            <h6>Quantity: {data.quantity}</h6>
                        </div>
                    )
                })
            }
        </div>
    )
}
