// import React, { useEffect, useState } from 'react'
// import { adminToken, apiUrl } from './Http'
// import { Link } from 'react-router-dom';

// const FeaturedProduct = () => {
//   const [products, setProducts] = useState([]);  // Initialize as an empty array

//   const featuredProducts = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/get-featured-products`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${adminToken()}`,
//         }
//       });

//       const result = await res.json();

//       if (result.status === 200) {
//         setProducts(result.data);
//       } else {
//         console.error('Error fetching featured products:', result.message);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     featuredProducts();
//   }, []);

//   return (
//     <div className="section-3 py-5">
//       <div className="container">
//         <h2 className="text-black text-uppercase" style={{ borderBottom: '5px solid black', display: 'inline-block', paddingBottom: '5px' }}>
//           Sản Phẩm Nổi Bật
//         </h2>
//         <div className="row mt-4">
//           {
//             products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product.id} className="col-md-3 col-6">
//                   <div className="product card border-0">
//                     <div className="card-img">
//                       <img src={product.image_url} alt={product.title} className="w-100" />
//                     </div>
//                     <div className="card-body pt-3">
//                       <Link to={`/product-detail/${product.id}`}>
//                         {product.title}
//                       </Link>
//                       <div className="product-price">
//                         {product.price}
//                         <span className="text-decoration-line-through ps-3">
//                           {product.compare_price}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>Không có sản phẩm nổi bật.</p> // Show message if no products found
//             )
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProduct;
import React, { useEffect, useState } from 'react'
import { adminToken, apiUrl } from './Http'
import { Link } from 'react-router-dom';

// Hàm định dạng giá
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + ' đ';
}

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);  // Initialize as an empty array

  const featuredProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-featured-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`,
        }
      });

      const result = await res.json();

      if (result.status === 200) {
        setProducts(result.data);
      } else {
        console.error('Error fetching featured products:', result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    featuredProducts();
  }, []);

  return (
    <div className="section-3 py-5">
      <div className="container">
        <h2 className="text-black text-uppercase" style={{ borderBottom: '5px solid black', display: 'inline-block', paddingBottom: '5px' }}>
          Sản Phẩm Nổi Bật
        </h2>
        <div className="row mt-4">
          {
            products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="col-md-3 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={product.image_url} alt={product.title} className="w-100" />
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
              ))
            ) : (
              <p>Không có sản phẩm nổi bật.</p> // Show message if no products found
            )
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
