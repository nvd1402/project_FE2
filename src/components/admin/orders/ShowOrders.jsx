import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { adminToken, apiUrl } from '../../Http'

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState([]);
     const fetchOrders = async () => {
        setLoader(true);
        const res = await fetch(`${apiUrl}/orders`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken()}`
          }
        })
        const result = await res.json();
        setLoader(false);
        if(result.status == 400){
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
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 p-4">
            <h3 className='m-0 p-0'>Orders</h3>
            {/* <Link to={`/admin/brands/create`}><button className='btn btn-primary'>Create</button></Link> */}
          </div>
          <div className="col-md-3">
            <Sidebar/>
          </div>
          <div className="col-md-9">
            <div className="card shadow p-4">
              <div className="card-body">
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
                        <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
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

export default ShowOrders