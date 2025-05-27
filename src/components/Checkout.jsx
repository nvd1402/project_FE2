import React, { useContext, useState } from 'react'
import Layout from './Layout'
import { CartContext } from './context/Cart1'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from './Http'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Checkout = () => {
    const [paymentMethod,setPaymentMethod] = useState('cod');
    const  {cartData,grandTotal, subTotal,shipping} = useContext(CartContext);
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }
    const navigate = useNavigate();

     const { 
                    register, 
                    handleSubmit, 
                    formState: { errors },
                 } = useForm();

    const processOrder = (data) =>{
     if(paymentMethod == 'cod'){
      saveOrder(data,'not paid');
     }
    }
    // const  saveOrder = (formData, paymentStatus) =>{
    //   const newFormData = {...formData,
    //     grandtotal: grandTotal(),
    //     subtotal : subTotal(),
    //     shipping: shipping(),
    //     discount: 0,
    //     payment_status: paymentStatus,
    //     status : 'pending',
    //     cart: JSON.parse(cartData)
    //   }
    //   fetch(`${apiUrl}/save-order`,{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': `Bearer ${userToken()}`
    //     },
    //     body: JSON.stringify(newFormData)
    //   }).then(res => res.json())
    //   .then(result =>{
    //     if(result.status == 400){
    //       localStorage.removeItem('cart');
    //       navigate(`/order/thanksOrder/${result.id}`)
    //     }else{
    //       toast.error(result.message);
    //     }
    //   })
    // }
    const saveOrder = (formData, paymentStatus) => {
      const newFormData = {
        ...formData,
        grandtotal: grandTotal(),
        subtotal: subTotal(),
        shipping: shipping(),
        discount: 0,
        payment_status: paymentStatus,
        status: 'pending',
        cart: typeof cartData === 'string' ? JSON.parse(cartData) : cartData // ✅ Kiểm tra kiểu trước khi parse
      };
    
      console.log("Dữ liệu gửi đi:", newFormData); // ✅ Debug dữ liệu trước khi gửi
    
      fetch(`${apiUrl}/save-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken()}`
        },
        body: JSON.stringify(newFormData) // ✅ Đảm bảo JSON.stringify()
      })
      .then(res => res.json())
      .then(result => {
        if (result.status == 400) {
          localStorage.removeItem('cart');
          navigate(`/order/thanksOrder/${result.id}`);
        } else {
          toast.error(result.message);
        }
      })
      .catch(error => console.error("Lỗi khi gửi đơn hàng:", error)); // ✅ Bắt lỗi nếu có
    };
    
  return (
    <Layout>

<div className="container checkout pb-3">
       <div className="row">
          <div className="col-md-12">
          <nav aria-label="breadcrumb" className='py-4'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: 'none',color: 'black' }}>Trang Chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">Cửa Hàng</li>
            <li className="breadcrumb-item">Thanh toán</li>
          </ol>
        </nav>
          </div>
          <form onSubmit={handleSubmit(processOrder)} >
          <div className="row">
            <div className="col-md-7">
            <h3 className='border-bottom pb-3'>Chi Tiết Đơn Hàng</h3>
                <div className="row pt-3">
                    <div className="col-md-6">
                        <input
                        {
                          ...register('name', {
                            required: 'The name is required'
                          })
                        }
                        type="text" className="form-control" id="fullName" placeholder='Họ và Tên' />
                        {
                          errors.name && <p className='text-danger'>{errors.name.message}</p>
                        }
                    </div>
                    <div className="col-md-6">
                        <input 
                        {
                          ...register('email', {
                            required: 'Email is required',
                          })
                        }
                        type="email" className="form-control" id="email" placeholder='Email' />
                        {
                          errors.email && <p className='text-danger'>{errors.email.message}</p>
                        }
                    </div>
                    <div className="col-md-12 pt-4 pb-4">
                       <textarea
                       {
                        ...register('address', {
                          required: 'Address is required',
                        })
                       }
                       className='form-control' placeholder='Địa Chỉ'></textarea>
                       {
                        errors.address && <p className='text-danger'>{errors.address.message}</p>
                       }
                    </div>
                    <div className="col-md-6">
                        <input 
                        {
                          ...register('mobile', {
                            required: 'Mobile number is required',
                          })
                        }
                        type="text" className="form-control" id="mobile" placeholder='Số Điện Thoại' />
                        {
                          errors.mobile && <p className='text-danger'>{errors.mobile.message}</p>
                        }
                    </div>
                    <div className="col-md-6">
                        <input 
                        {
                          ...register('city',{
                            required: 'City is required',
                          })
                        }
                        type="text" className="form-control" id="city" placeholder='City' />
                        {
                          errors.city && <p className='text-danger'>{errors.city.message}</p>
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-5">
            <h3 className='border-bottom pb-3'>Các mặt hàng</h3>
            <table className='table'>
                <tbody>
                  {
                    cartData.map(item => {
                      return (
                        <tr className='ps-4' key={`cart-${item.id}`}>
                        <td width={100}>
                          <img src={item.image_url} alt="Product 1" width="100" />
                        </td>
                        <td className='ps-3' width={600}>
                          <h4>{item.title}</h4>
                          <div className="d-flex align-items-center pt-3">
                            <span>{item.price} VND</span>
                            <div className="ps-3">
                               {
                                item.size && <button className="btn btn-size">{item.size}</button>
                               }
                            </div>
                          </div>
                        </td>
                        
                        <td >
                            X{item.qty}
                        </td>
                       
        
        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
            
            <div className="row border-top pb-5">
          <div className="col-md-12">
            <div className="d-flex justify-content-between border-bottom pb-3">
              <div>Giá:</div>
              <div>{subTotal()} VND</div>
            </div>
            <div className="d-flex justify-content-between border-bottom pb-3">
              <div>Phí vận chuyển:</div>
              <div>{shipping()} VND</div>
            </div>
            <div className="d-flex justify-content-between border-bottom pb-3">
              <div><strong>Tổng tiền:</strong></div>
              <div>{grandTotal()} VND</div>
            </div>
          </div>
            </div>
            <h3 className='border-bottom pb-2'><strong>Phương thức thanh toán</strong></h3>
            <div>
                    <input type="radio"
                    onClick={handlePaymentMethod}
                     defaultChecked={paymentMethod == 'paypal'} className='pe-2'  value={'paypal'} />
                    <label className='form-label ps-2' htmlFor="paypal">VNPAY</label>

                    <input type="radio"
                    onClick={handlePaymentMethod}
                     className='ms-3' 
                     defaultChecked={paymentMethod == 'cod'}   value={'cod'} />
                    <label className='form-label ps-2' htmlFor="cod">Thanh toán khi nhận hàng</label>
                </div>
            <div className="d-flex justify-content-end py-3">
                
              <button className="btn btn-primary m-2">Thanh toán ngay</button>
            </div>
            
            </div>
            
          </div>
          </form>
        </div>
    </div>
    </Layout>
   
  )
}

export default Checkout

