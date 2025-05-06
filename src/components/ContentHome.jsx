import React from 'react'
import  Icon1 from '../assets/images/Icon1.png'
import  Icon2 from '../assets/images/icon2.png'
import  Icon3 from '../assets/images/icon3.png'
const ContentHome = () => {
  return (
    // <div className="container content-home mt-5">
    //     <div className="row ">
    //         <div className="col-md-4">
    //             <div className="row">
    //                 <div className="col-md-6">
    //                 <img  src={Icon1} alt="Icon1" className='img-icon' />
    //                 </div>
    //                 <div className="col-md-6">
    //                 <span className='text-content'>GIAO HÀNG HỎA TỐC </span>
    //                 <p>Ship hỏa tốc 2h với đơn ở TP.Hà Nội</p>
    //                 </div>
    //             </div>
                
    //         </div>
    //         <div className="col-md-4">
    //         <div className="row">
    //                 <div className="col-md-6">
    //                 <img src={Icon2} alt="Icon1" className='img-icon1' />
    //                 </div>
    //                 <div className="col-md-6">
    //                 <span className='text-content'>MIỄN PHÍ GIAO HÀNG </span>
    //                 <p>Freeship đơn từ 500k</p>
    //                 </div>
    //             </div>
               

    //         </div>
    //         <div className="col-md-4">
    //         <div className="row">
    //                 <div className="col-md-6">
    //                 <img src={Icon3} alt="Icon1" className='img-icon1' />
    //                 </div>
    //                 <div className="col-md-6">
    //                 <span className='text-content'>ĐỔI HÀNG MIỄN PHÍ </span>
    //                 <p>Hỗ trợ đổi SIZE - MẪU trong <strong>7 ngày</strong></p>
    //                 </div>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    <div className="container content-home mt-5">
    <div className="row g-4"> {/* g-4 tạo khoảng cách giữa các cột */}
        <div className="col-md-4">
            <div className="service-box d-flex align-items-center p-3 rounded shadow">
                <div className="col-5 text-center">
                    <img src={Icon1} alt="Icon1" className="img-icon" />
                </div>
                <div className="col-7">
                    <span className="text-content">GIAO HÀNG HỎA TỐC</span>
                    <p>Ship hỏa tốc 2h với đơn ở TP.Hà Nội</p>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="service-box d-flex align-items-center p-3 rounded shadow">
                <div className="col-5 text-center">
                    <img src={Icon2} alt="Icon2" className="img-icon1" />
                </div>
                <div className="col-7">
                    <span className="text-content">MIỄN PHÍ GIAO HÀNG</span>
                    <p>Freeship đơn từ 500k</p>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="service-box d-flex align-items-center p-3 rounded shadow">
                <div className="col-5 text-center">
                    <img src={Icon3} alt="Icon3" className="img-icon1" />
                </div>
                <div className="col-7">
                    <span className="text-content">ĐỔI HÀNG MIỄN PHÍ</span>
                    <p>Hỗ trợ đổi SIZE - MẪU trong <strong>7 ngày</strong></p>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default ContentHome