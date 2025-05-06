import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import  Women from '../assets/images/women.jpg'
import { Link, useSearchParams } from 'react-router-dom'
import { adminToken, apiUrl } from './Http'
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [catChecked, setCatChecked] = useState(() =>{
    const category = searchParams.get('category');
    return category ? category.split(','):[];
  });
  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'Đang cập nhật';
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const [brandChecked, setBrandChecked] = useState(() =>{
    const brand = searchParams.get('brand');
    return brand ? brand.split(','):[];
  });
  




  const fetchCategories = async () => {
      const res = await fetch(`${apiUrl}/get-categories`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
      })
      const result = await res.json();
      if(result.status == 200) {
        setCategories(result.data)
      }else{
        console.log(result.message)
      }
  }
  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/get-brands`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
    })
    const result = await res.json();
    if(result.status == 200) {
      setBrands(result.data)
    }
}
const fetchProducts = async () => {
  let search = [];
  let params = '';
  if(catChecked.length > 0){
    search.push(['category',catChecked])
  }
  if(brandChecked.length > 0){
    search.push(['brand',brandChecked])
  }
  if(search.length > 0){
    params = new URLSearchParams(search);
    setSearchParams(params);
  } 
  console.log(params.toString());
   fetch(`${apiUrl}/get-products?${params}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken()}`
    },
  })
  .then(res => res.json())
  .then(result => {
    if(result.status == 200) {
      setProducts(result.data)
    }else{
      console.log(result.message)
    }
    })
  
}
const handleCategory =  (e) =>{
     const {checked, value} = e.target;
     if(checked){
       setCatChecked(pre => [...pre, value])
     }else{
       setCatChecked(catChecked.filter(id => id != value))
     }
}
const handleBrand = (e) =>{
    const {checked, value} = e.target;
    if(checked){
      setBrandChecked(pre => [...pre, value])
    } else{
      setBrandChecked(brandChecked.filter(id => id != value))    }
}

  useEffect(() =>{
    fetchCategories();
    fetchBrands();
    fetchProducts();
  },[catChecked,brandChecked]);
  return (
   <Layout>
    <div className="container">
    <nav aria-label="breadcrumb" className='py-4'>
  <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <a href="#" style={{ textDecoration: 'none',color: 'black' }}>Trang Chủ</a>
    </li>
    <li className="breadcrumb-item active" aria-current="page">Cửa Hàng</li>
  </ol>
</nav>

    <div className="row">
      <div className="col-md-3">
        <div className="card shadow border-0 mb-3">
            <div className="card-body p-4">
            <h3 className="mb-3">Thể loại</h3>
            
              <ul>
                  {categories.map((category) => (
                    <li key={`cat-${category.id}`}>
                      <input
                        checked={searchParams.get('category')?.includes(category.id) || false}
                        type="checkbox"
                        value={category.id}
                        onChange={handleCategory} // Đổi onClick thành onChange
                      />
                      <label className="ps-2">{category.name}</label>
                    </li>
                  ))}
              </ul>

            
            </div>

      </div>
      <div className="card shadow border-0 mb-3">
            <div className="card-body p-4">
            <h3 className="mb-3">Nhãn Hiệu</h3>
            {
            
            <ul>
                  {brands.map((brand) => (
                    <li key={`brand-${brand.id}`} className="mb-2">
                      <input
                        checked={searchParams.get('brand')?.includes(brand.id) || false}
                        type="checkbox"
                        value={brand.id}
                        onChange={handleBrand} // Đổi onClick thành onChange
                      />
                      <label className="ps-2">{brand.name}</label>
                    </li>
                  ))}
            </ul>

            }
            </div>

      </div>
      </div>
      
      <div className="col-md-9">
      <div className="row pb-3 d-flex flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image_url} alt={product.title} className="w-100" />
                </Link>
              </div>
              <div className="card-body pt-3">
                <Link to={`/product/${product.id}`}>{product.title}</Link>
                <div className="product-price">
  <span className="current-price text-danger fs-3 fw-3">
    {formatPrice(product.price)}
  </span>
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
      
    </div>
   </Layout>
  )
}

export default Shop