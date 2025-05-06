import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import Bg1 from '../assets/images/bg1.jpeg';
import Bg2 from '../assets/images/bg2.jpeg';
import Bg3 from '../assets/images/bg6.jpg';


const Slider = () => {
  return (
    // <div className="flex justify-center items-center gap-4 p-4">
    //   <div className="w-[600px] h-[400px]">
    //     <Swiper
    //       modules={[Navigation, Pagination, Autoplay]}
    //       navigation
    //       pagination={{ clickable: true }}
    //       autoplay={{ delay: 2000 }}
    //       loop={true}
    //       className="rounded-lg overflow-hidden"
    //     >
    //       <SwiperSlide><img src={Bg2} alt="Slide 2" className="w-full h-full object-cover" /></SwiperSlide>
    //       <SwiperSlide><img src={Bg1} alt="Slide 3" className="w-full h-full object-cover" /></SwiperSlide>
    //     </Swiper>
    //   </div>
    // </div>
    
    <div className="position-relative w-100 h-100">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 2000 }}
    loop={true}
    className="w-100 h-100"
  >
    <SwiperSlide>
      <img
        src={Bg2}
        alt="Slide 2"
        style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src={Bg1}
        alt="Slide 3"
        style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src={Bg3}
        alt="Slide 3"
        style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}
      />
    </SwiperSlide>
  </Swiper>
</div>


  );
};

export default Slider;
