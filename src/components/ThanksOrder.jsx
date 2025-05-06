import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, userToken } from './Http';
import { toast } from 'react-toastify';

const ThanksOrder = () => {

    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItem] = useState([]);
    const params = useParams()

    const fetchOrder = () => {
        fetch(`${apiUrl}/get-order-details/${params.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            }
        }).then(res => res.json())
        .then(result => {
            if(result.status == 200){
                setOrder(result.data);
                setLoading(false);
                setItem(result.data.items);
            }else{
                toast.error(result.message);
            }
        })
    }
    useEffect(() =>{
        fetchOrder();
    });
  return (
    <Layout>
        <div className="container py-5">
            {
                loading == true &&
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {
                loading == false && order &&
             <div>
                <div className="row">
            <div className=" fs-1 text-uppercase text-center fw-bold text-success">
              Cảm ơn
            </div>
            <p className=' fs-5 text-muted text-center'>Đơn hàng của bạn đã được đặt thành công.</p>
           </div>
           <div className="card shadow">
             <div className="card-body">
                <h3 className='fw-bold'>Chi tiết đơn hàng</h3>
                <hr />
                <div className="row">
                    <div className="col-6">
                      <p><strong>Mã đơn hàng:</strong> #{order.id}</p>
                      <p><strong>Ngày đặt hàng:</strong>{order.created_at}</p>
                      <p><strong>Trạng thái: </strong>
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
                      </p>
                      <p><strong>Phương thức thanh toán: </strong> Thanh toán khi nhận hàng</p>
                    </div>
                    <div className="col-6">
                         <p><strong>Khách hàng: </strong>{order.name}</p>
                         <p><strong>Địa chỉ: </strong> {order.address}</p>
                         <p><strong>Liên hệ: </strong>{order.mobile}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className='table-striped table-bordered table'>
                               <thead className='table-light'>
                                <tr>
                                 <th>Mặt hàng</th>
                                 <th>Giá</th>
                                 <th width="150">Số lượng</th>
                                 <th width="150">Tổng tiền</th>   
                                </tr>
                               </thead>
                               <tbody>
                                {
                                    items.map((item) =>{
                                        return (
                                          <tr key={item.id}>
                                               <td>{item.name}</td>
                                               <td>{item.price} VND</td>
                                               <td>{item.qty}</td>
                                               <td>{(item.price * item.qty).toLocaleString()}</td>
                                          </tr>
                                        )
                                    })
                                }
                               </tbody>
                               <tfoot>
                                <tr>
                                    <td className='text-end fw-bold' colSpan={3}>Đơn giá</td>
                                    <td>{order.subtotal} VND</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-bold' colSpan={3}>Phí vận chuyển</td>
                                    <td>{order.shipping} VND</td>
                                </tr>
                                <tr>
                                    <td className='text-end fw-bold' colSpan={3}>Tổng tiền</td>
                                    <td>{order.grandtotal} VND</td>
                                </tr>
                               </tfoot>
                        </table>
                    </div>
                    <div className="text-center">
                        <button className='btn btn-primary'>Xem chi tiết đơn hàng</button>
                        <Link to={'/'}> <button className='btn btn-outline-secondary ms-3'>Tiếp tục mua hàng</button> </Link>
                    </div>
                </div>
             </div>
           </div>
             </div>
            }
            {
                loading == false && !order &&
                <div className="text-center py-5">
                    <p>Đơn hàng này không tồn tại hoặc đã bị hủy.</p>
                    <button className='btn btn-primary' onClick={() => history.goBack()}>Quay lại</button>
                </div>
            }
           
        </div>
    </Layout>
  )
}

export default ThanksOrder