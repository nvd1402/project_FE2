import React from 'react'
import Category1 from '../assets/images/DanhMuc1.jpg';
import Category2 from '../assets/images/DanhMuc2.jpg';
import Category3 from '../assets/images/DanhMuc3.jpg';
import Category4 from '../assets/images/DanhMuc4.jpg';
const Product_Catalog = () => {
  return (
    <div className="section-2 pt-5">
             <div className="container">
             <h2
  className="text-center text-uppercase"
  style={{
    borderBottom: '5px solid black',
    display: 'inline-block',
    paddingBottom: '5px',
    color: 'red', 
    width: '100%', 
  }}
>
 DANH MỤC SẢN PHẨM
</h2>
             
   {/* <div className="row mt-4">
     <div className="col-md-3">
        <div className="product-card">
        <img src={Category1} alt="Product 1" className="img-fluid " />
        <div className="product-details">
          <p className="text-muted text-uppercase mb-2">Áo Polo</p>
        </div>
      </div>
     </div>
     <div className="col-md-3">
        <div className="product-card">
        <img src={Category2} alt="Product 1" className="img-fluid " />
        <div className="product-details">
          <p className="text-muted text-uppercase mb-2">Áo sơ mi</p>
        </div>
      </div>
     </div>
     <div className="col-md-3">
        <div className="product-card">
        <img src={Category3} alt="Product 1" className="img-fluid " />
        <div className="product-details">
          <p className="text-muted text-uppercase mb-2">Áo Khoác</p>
        </div>
      </div>
     </div>
     <div className="col-md-3">
        <div className="product-card">
        <img src={Category4} alt="Product 1" className="img-fluid " />
        <div className="product-details">
          <p className="text-muted text-uppercase mb-2">Áo Khoác</p>
        </div>
      </div>
     </div>
   </div> */}
   <div className="row mt-4">
  <div className="col-md-3">
    <div className="product-card position-relative">
      <img src={Category1} alt="Demo 1" className="img-fluid w-100" />
      <div className="overlay-text d-flex justify-content-between align-items-center px-3">
        <p className="mb-0 fw-medium">Áo Polo</p>
        <span className="arrow-icon">➜</span>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="product-card position-relative">
      <img src={Category2} alt="Demo 2" className="img-fluid w-100" />
      <div className="overlay-text d-flex justify-content-between align-items-center px-3">
        <p className="mb-0 fw-medium">Áo Thun</p>
        <span className="arrow-icon">➜</span>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="product-card position-relative">
      <img src={Category3} alt="Demo 3" className="img-fluid w-100" />
      <div className="overlay-text d-flex justify-content-between align-items-center px-3">
        <p className="mb-0 fw-medium">Áo Sơ Mi</p>
        <span className="arrow-icon">➜</span>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="product-card position-relative">
      <img src={Category4} alt="Demo 4" className="img-fluid w-100" />
      <div className="overlay-text d-flex justify-content-between align-items-center px-3">
        <p className="mb-0 fw-medium">Áo Khoác</p>
        <span className="arrow-icon">➜</span>
      </div>
    </div>
  </div>
</div>



             </div>
    </div>
  )
}

export default Product_Catalog