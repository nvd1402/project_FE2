import React from 'react';
import Layout from './Layout';
import BG1 from '../assets/images/bg3.png'
import BG2 from '../assets/images/bg4.jpg'
import BG3 from '../assets/images/bg5.jpg'
import BG4 from '../assets/images/DanhMuc4.jpg'
const AboutUs = () => {
  return (
    <Layout>
        <div className="about-us-container">
      {/* Header */}
   

      {/* Giới thiệu về cửa hàng */}
      <section className="about-us-header" id="about">
        <h1>Chào mừng đến với Torano!</h1>
        <p className='fs-3'>Khám phá các bộ sưu tập thời trang tuyệt vời tại Torano. Chúng tôi cam kết mang đến sự hoàn hảo cho bạn mỗi ngày.</p>
      </section>

      <section className="about-us-info">
        <div className="about-us-text">
          <h2>Về chúng tôi</h2>
          <p className='fs-3'>
            Torano là thương hiệu thời trang nổi bật với phong cách hiện đại, sáng tạo và luôn đi đầu trong xu hướng. Chúng tôi cung cấp các sản phẩm từ quần áo, giày dép đến phụ kiện cho mọi lứa tuổi và phong cách.
          </p>
        </div>
        <div className="about-us-image">
          <img src={BG1} alt="Torano Store" />
        </div>
      </section>

      {/* Bộ sưu tập nổi bật */}
      <section className="collections" id="collections">
  <h2 className='text-uppercase p-3'>Bộ Sưu Tập Nổi Bật</h2>
  <div className="collection-items">
    <div className="collection-item">
      <img src={BG2} alt="Collection 1" />
      <p>Thời trang mùa xuân 2025</p>
    </div>
    <div className="collection-item">
      <img src={BG3} alt="Collection 2" />
      <p>Thời trang nam mới nhất</p>
    </div>
    <div className="collection-item">
      <img src={BG4} alt="Collection 3" />
      <p>Bộ sưu tập cho mùa đông 2025</p>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <h2>Khách Hàng Nói Gì</h2>
        <div className="testimonial">
          <p>"Torano luôn là lựa chọn hàng đầu của tôi khi cần tìm thời trang chất lượng. Sản phẩm đẹp, bền và giá cả hợp lý!" - Lan Anh</p>
        </div>
        <div className="testimonial">
          <p>"Dịch vụ khách hàng của Torano rất tuyệt vời, tôi luôn được tư vấn nhiệt tình và hài lòng với mọi lần mua hàng." - Minh Tú</p>
        </div>
      </section>


     
    </div>
    </Layout>
  );
};

export default AboutUs;
