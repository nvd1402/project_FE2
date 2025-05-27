import React, { useEffect, useState } from 'react'
import AoThun from '../assets/images/AoThun.jpeg'
import { apiUrl } from './Http'
import { Link } from 'react-router-dom';

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + ' đ';
}
const LatestProduct = () => {
  
  

  const [products, setProducts] = useState([]);
  const latestProduct = async () =>{
    const res = await fetch(`${apiUrl}/get-latest-products`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await res.json();
    if(result.status == 200){
      setProducts(result.data);
    }
  }
  
  useEffect(() => {
    latestProduct();
  },[]);
  
  return (
    <>
    <div className="section-2 py-5">
             <div className="container">
             <h2 className="text-black text-uppercase" style={{ borderBottom: '5px solid black', display: 'inline-block', paddingBottom: '5px' }}>
     Hàng Mới Về
   </h2>          
   <div className="row mt-4">
  {products.map((product) => (
    <div key={product.id} className="col-md-3 col-6">
      <div className="product card border-0">
        <div className="card-img">
          <img src={product.image_url} alt="" className="w-100" />
        </div>
        <div className="card-body pt-3">
          <Link to={`/product-detail/${product.id}`}>
            {product.title}
          </Link>
          <div className="product-price">
          {formatPrice(product.price)}
          <span className="text-decoration-line-through ps-3 com-price">
          {formatPrice(product.compare_price)}
          </span>
        </div>
        </div>
      </div>
    </div>
  ))}
</div>

             </div>
    </div>
    </>
   
    
    
  )
}

export default LatestProduct