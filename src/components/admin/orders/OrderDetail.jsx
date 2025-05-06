import React, { useState } from 'react'
import Layout from '../../Layout'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useEffect } from 'react'
import { adminToken, apiUrl } from '../../Http'
import Loader from '../../Loader'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const OrderDetail = () => {
    const [order, setOrders] = useState([]);
    const [loader, setLoader] = useState([]);
    const [items, setItems] = useState([]);
    const params = useParams();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const fetchOrders = async () => {
            setLoader(true);
            const res = await fetch(`${apiUrl}/orders/${params.id}`,{
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
              setItems(result.data.items);
               reset({
                status: result.data.status,
                payment_status: result.data.payment_status
               })
            }else{
              console.log(result.message);
            }
}

    const updateOrder = async (data) =>{
        setLoader(true);
            const res = await fetch(`${apiUrl}/update-order/${params.id}`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
              },
              body: JSON.stringify(data)
            })
            const result = await res.json();
            setLoader(false);
            if(result.status == 200){
              setOrders(result.data);
               reset({
                status: result.data.status,
                payment_status: result.data.payment_status
               });
               toast.success(result.message);

            }else{
              console.log(result.message);
            }
    }
          useEffect(() =>{
            fetchOrders();
            updateOrder();
          });
  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-between mt-5 pb-3">
                    <h4 className='h4 pb-0 mb-0'>Orders Details</h4>
                    <Link to='/admin/orders' className='btn btn-primary'>Back</Link>
                </div>
                <div className="col-md-3">
                    <Sidebar/>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="card shadow mb-5">
                                <div className="card-body p-4">
                                    {
                                        loader == true && <Loader/>
                                        
                                    }
                                    {
                                       <div>
                                        <div className="row">
                                        <div className="col-md-4">
                                            <h5>Mã đơn hàng: {order.id}</h5>
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
                                        </div>
                                        <div className="col-md-4">
                                         <div className="text-secondary">Ngày</div>
                                         <div className='pt-2'>{order.created_at}</div>
                                        </div>
                                        <div className="col-md-4">
                                         <div className="text-secondary">
                                            Trạng thái thanh toán:
                                         </div>
                                         {
                                                order.payment_status == 'paid'?
                                                <span className='badge bg-success'>Đã thanh toán</span>
                                                : <span className='badge bg-danger'>Chưa thanh toán</span>
                                         }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="py-3">
                                                <strong>{order.name}</strong>
                                                <div>{order.email}</div>
                                                <div>{order.mobile}</div>
                                                <div>{order.address}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="text-secondary pt-3">Payment Status</div>
                                            <div className='pt-2'>COD</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <h3 className="pb-2 "><strong>Items</strong></h3>
                                     {
                                        items.map((item) =>{
                                            return(
                                                <tr key={item.id}>
                                    <div className="row justify-content-end">
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                <div className="d-flex">
                                                    {
                                                        item.product.image && <img width={70} className='me-3' src={`${item.product.image_url}`} />
                                                    }
                                                <div className="d-flex flex-column">
                                                    <div className="mb-2"><span>{item.name}</span></div>
                                                    <div><button className="btn btn-size">{item.size}</button></div>
                                                </div>
                                                </div>
                                                <div className="d-flex">
                                                <div>X {item.qty}</div>
                                                <div className="ps-3">{item.price} VND</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-lg-12">
                                            <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                <div>Subtotal</div>
                                                <div>{order.subtotal} VND</div>
                                            </div>
                                            <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                <div>Shipping</div>
                                                <div>{order.shipping} VND</div>
                                            </div>
                                            <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                <div><strong>Grand Total</strong></div>
                                                <div>{order.grandtotal} VND</div>
                                            </div>
                                        </div>
                                    </div>
                                                </tr>
                                            )
                                        })
                                     }
                                    </div>
                                       </div> 
                                    }
                                    
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit(updateOrder)} >
                                        <div className="mb-3">
                                        <label className='form-label' htmlFor="status"> Status</label>
                                        <select 
                                        {
                                            ...register('status',{required: true})
                                        }
                                        id="status" className='form-select'>
                                            <option value="pending">Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="payment_status">Payment Status</label>
                                            <select 
                                            {
                                                ...register('payment_status',{required: true})
                                            }
                                            id="payment_status" className='form-select'>
                                                <option value="paid">Paid</option>
                                                <option value="not paid">Not Paid</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default OrderDetail