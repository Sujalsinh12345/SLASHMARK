import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function MyOrder() {

    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchMyOrder = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const email = localStorage.getItem('userEmail')
            if (!email) {
                throw new Error('User email not found')
            }

            const response = await fetch("http://localhost:5001/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })

            if (!response.ok) {
                throw new Error('Failed to fetch order data')
            }

            const data = await response.json()
            setOrderData(data.orderData?.order_data || [])
        } catch (error) {
            setError(error.message)
            toast.error('Error loading order history')
        } finally {
            setLoading(false)
        }
    }




    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'></div>
            <div className='row'> </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger mt-3">{error}</div>
            ) : orderData.length > 0 ? (
                orderData.slice().reverse().map((arrayData, index) => {
                    return (
                        <div key={`container-${index}`}>
                            {arrayData.Order_date ? (
                                <div key={`date-${index}`} className='m-auto mt-5'>
                                    {new Date(arrayData.Order_date).toLocaleDateString()}
                                    <hr />
                                </div>
                            ) : (
                                <div key={`item-${index}`} className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{arrayData.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{arrayData.qty}</span>
                                                <span className='m-1'>{arrayData.size}</span>
                                                <span className='m-1'>{arrayData.Order_date ? new Date(arrayData.Order_date).toLocaleDateString() : ''}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{arrayData.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="text-muted">No orders found</div>
            )}
        </div>)}
