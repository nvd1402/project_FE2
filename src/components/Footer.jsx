import React from 'react'
import Logo from '../assets/images/logo.webp'

const Footer = () => {
  return (
    <footer className='py-5 text-white'>
          <div className="container">
            <div className="row ">
              <div className="col-md-4 pb-5">
              <img src={Logo} alt="Logo" width="50" height="50" className="d-inline-block me-3" />
                <p className='pt-3 pe-3'>Cửa hàng Fashion Store chuyên bán các sản phẩm thời trang và đồ dùng mỗi ngày</p>
              </div>
              <div className="col-md-4 pb-5">
                  <h4 className='mb-3'>Liên hệ Nhanh</h4>
                  <ul>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>                  
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                   
                  </ul>
              </div>
              <div className="col-md-4 pb-5">
               <h4 className='mb-3'>Liên Hệ Với Chúng Tôi</h4>
               <p>Địa chỉ: 305 Cầu Giấy, Hà Nội </p>
               <p>Hotline: 0909 123 456</p>
               <p>Email: info@fashionstore.com</p>
              </div>
            </div>
          </div>
           {/* <p className=' fs-5'>�� 2021 Fashion Store. All rights reserved.</p> */}
      </footer>
  )
}

export default Footer