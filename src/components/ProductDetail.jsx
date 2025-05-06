import React, { useContext, useEffect, useState } from 'react'
import Layout from './Layout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import IconPr1 from '../assets/images/ic1.jpg'
import IconPr2 from '../assets/images/ic2.jpg'
import IconPr3 from '../assets/images/ic3.jpg'
import IconPr4 from '../assets/images/ic4.jpg'
import IconPr5 from '../assets/images/ic5.jpg'
import IconPr6 from '../assets/images/ic6.jpg'
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
import { apiUrl } from './Http';
import { CartContext } from './context/Cart1';
import { toast } from 'react-toastify';


const formatPrice = (price) => {
  if (typeof price !== 'number') return 'Đang cập nhật';
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductDetail = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4.5);
    const[product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null);
    const params =  useParams();
    const { addToCart } = useContext(CartContext)

    const fetchProduct = () => {
      fetch(`${apiUrl}/get-product/${params.id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'          
        }
      })
      .then(res => res.json())
      .then(result =>{
            if(result.status == 200){
              setProduct(result.data);
              setProductImages(result.data.product_images);
              setProductSizes(result.data.product_sizes);
            }else{
              console.log('Error: ', result.message);
            }
      })
    }
    const handleAddToCart = () => {
       if(productSizes.length > 0){
        if(sizeSelected == null){
          toast.error("Please select a size");
        }else{
          addToCart(product, sizeSelected)
          toast.success("Sản phẩm đã được thêm vào giỏ hàng");
        }
       }else{
        addToCart(product,null);
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
       }
    }
    useEffect(() => {
        fetchProduct()
    },[])

  return (
    <Layout>
        <div className="container product-detail">
        <nav aria-label="breadcrumb" className='pt-4'>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: 'none',color: 'black' }}>Trang Chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">Cửa Hàng</li>
            <li className="breadcrumb-item">Chi tiết sản phẩm</li>
          </ul>
        </nav>
        </div>
        <div className="row">
            <div className="col-md-5">
            <div className="row gx-3 border p-3">
      {/* Thumbnail swiper */}
      <div className="col-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-3"
        >
          {productImages.map((product_image) => (
            <SwiperSlide key={`thumb-${product_image.id}`}>
              <img
                src={product_image.image_url}
                alt=""
                className="thumb-img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main swiper */}
      <div className="col-8">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {productImages.map((product_image) => (
            <SwiperSlide key={`main-${product_image.id}`}>
              <div className="main-img-wrapper">
                <img
                  src={product_image.image_url}
                  alt=""
                  className="main-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

            </div>
            <div className="col-md-7">
                   <h2>{product.title}</h2>
                   <div className="d-flex">
                   <Rating
                    size={20}
                    readonly
                    initialValue={rating}
                    />
                    <span className='m-1'>10 Đánh giá</span>
                   </div>

                   <div className='pt-3 pb-3 fs-5'>
                   <span className='text-black'>Mã sản phẩm : </span> 
                    <strong>{product.sku}</strong> &nbsp; &nbsp;&nbsp;&nbsp;
                    <span className='text-black'>Thương hiệu: </span>
                    <strong>{product.brand?.name}</strong>
                   </div>
                   
                    <div className=" pb-3">
                    
                   {/* <div className="price mt-2">
                    {product.price} đ <span className='text-decoration-line-through com-price'> {product.compare_price} đ</span>
                   </div> */}
                   <div className="product-price">
  <span className="current-price text-danger fs-3 fw-3">
    {formatPrice(product.price)}
  </span>
  <span className="text-decoration-line-through ps-3 com-price">
    {formatPrice(product.compare_price)}
  </span>
</div>

                   
                   <div className="pt-3">
                   <strong >Chọn Kích Cỡ:</strong>
                   <div className="sizes pt-3">
                    {
                      productSizes.map(product_size =>{
                        return(
                          <button
                          key={`p-size-${product_size.id}`}
                          onClick={() => setSizeSelected(product_size.size.name)}
                          className={`btn btn-size me-2 ${setSizeSelected == product_size.size.name ? 'active': ''}`}>{product_size.size.name} </button>
                        )
                      })
                    }
                   </div>
                   </div>

                   <div className="add-to-cart pt-4">
                    <button
                    onClick={() => {
                      handleAddToCart()
                    }}
                    className='btn btn-primary text-uppercase'>Thêm vào giỏ hàng</button>
                   </div>
                   <hr />
                   <div>
                    <h4><strong className='text-uppercase'>Thông tin sản phẩm</strong></h4>
                    <p className='fs-5'>{product.short_description}</p>
                   </div>
                   <hr />
                   <div className="container py-4">
  <div className="row">
    {/* Hàng 1 */}
    <div className="col-md-4 mb-3 d-flex align-items-center">
      <img src={"https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc1_img.png?v=706"} alt="icon" className="me-2" style={{ width: '50px' }} />
      <span >Miễn phí giao hàng cho đơn hàng từ 500K</span>
    </div>
    <div className="col-md-4 mb-3 d-flex align-items-center">
      <img src={"https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc1_img.png?v=706"} alt="icon" className="me-2" style={{ width: '50px' }} />
      <span >Hàng phân phối chính hãng 100%</span>
    </div>
    <div className="col-md-4 mb-3 d-flex align-items-center">
      <img src={"https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc2_img.png?v=706"} alt="icon" className="me-2" style={{ width: '50px' }} />
      <span >TỔNG ĐÀI 24/7 : 0369944553</span>
    </div>

    {/* Hàng 2 */}
    <div className="col-md-4 mb-3 d-flex align-items-center">
      <img src={"https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc2_img.png?v=706"} alt="icon" className="me-2" style={{ width: '50px' }} />
      <span >ĐỔI SẢN PHẨM DỄ DÀNG (Trong vòng 7 ngày khi còn nguyên tem mác)</span>
    </div>
    <div className="col-md-4 mb-3 d-flex align-items-center">
      <img src={"https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc3_img.png?v=706"} alt="icon" className="me-2" style={{ width: '50px' }} />
      <span >Kiểm tra, thanh toán khi nhận hàng COD</span>
    </div>
    <div className="col-md-4 mb-3 d-flex align-items-center">
      <img src={"https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc3_img.png?v=706"} alt="icon" className="me-2" style={{ width: '50px' }} />
      <span>Hỗ trợ bảo hành, đổi sản phẩm tại tất cả store TORANO</span>
    </div>
  </div>
</div>

                   
                   

                   </div>

                   
                   
                   
                   
            </div>

        <div className="row ms-5">
            <div className="col-md-12">
            <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="description" title="Mô tả chi tiết">
        <div dangerouslySetInnerHTML={{__html:product.description}}>

        </div>
      </Tab>
      <Tab eventKey="reviews" title="Đánh giá(10)">
        Đánh giá 
      </Tab>
      
    </Tabs>
            </div>
        </div>
        </div>
        
    </Layout>
  )
}

export default ProductDetail