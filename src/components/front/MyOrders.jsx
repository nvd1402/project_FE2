import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import UserSidebar from '../UserSidebar'
import { apiUrl, userToken } from '../Http'

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
        const [loader, setLoader] = useState(false);
         const fetchOrders = async () => {
            setLoader(true);
            const res = await fetch(`${apiUrl}/get-orders`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken()}`
              }
            })
            const result = await res.json();
            setLoader(false);
            if(result.status == 200){
              setOrders(result.data);
            }else{
              console.log(result.message);
            }
          }
          useEffect(() =>{
            fetchOrders();
          },[]);
  return (
    <Layout>
    <div className="container mb-5">
        <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
                <h4 className='h4 pb-0 mb-0'>My Orders</h4>
                {/* <Link to='' className='btn btn-primary'>Button</Link> */}
            </div>
            <div className="col-md-3">
                <UserSidebar/>
            </div>
            <div className="col-md-9">
                <div className="card shadow">
                    <div className="card-body p-4">
                        <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Email</th>
                                                <th>Total Amount</th>
                                                <th>Order Date</th>
                                                <th>Status</th>
                                                <th>Payment Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {
                                            loader? (
                                            <tr>
                                                <td colSpan="8" className="text-center">Loading...</td>
                                            </tr>
                                            ) : (
                                              orders.length === 0 && (
                                                <tr>
                                                  <td colSpan="8" className="text-center">No orders found.</td>
                                                </tr>
                                              )
                                            )
                                          }
                                         {
                                          orders.map((order) =>{
                                            return(
                                            <tr key={order.id}>
                                              <td>
                                                <Link to={`/account/orders/details/${order.id}`}>{order.id}</Link>
                                              </td>
                                                <td>{order.name}</td>
                                                <td>{order.email}</td>
                                                <td>{order.grandtotal}</td>
                                                <td>{order.created_at}</td>
                                                <td>
                                                   {
                                                    order.status == 'pending' && <span className='badge bg-warning'>Đang xử lý</span>
                                                  }
                                                  {
                                                    order.status == 'shipped' && <span className='badge bg-info'>Đang giao hàng</span>
                                                  }
                                                  {
                                                    order.status == 'delivered' && <span className='badge bg-success'>Đã giao </span>
                                                  }
                                                  {
                                                    order.status == 'cancelled' && <span className='badge bg-danger'>Đã hủy</span>
                                                  }
                                                  
                                                </td>
                                                <td>
                                                  {
                                                    order.payment_status == 'paid'?
                                                    <span className='badge bg-success'>Đã thanh toán</span>
                                                    : <span className='badge bg-danger'>Chưa thanh toán</span>
                                                  }
                                                </td>
                                               
                                            </tr>
                                         )
                                    })
                                         }
                                        </tbody>
                        
                                       </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default MyOrders