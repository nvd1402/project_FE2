import React from 'react'
import  OutFit1 from '../assets/images/OutFit.jpg'
import  OutFit2 from '../assets/images/OutFit2.jpg'
import  OutFit3 from '../assets/images/OutFit3.jpg'
const OutFitTheDay = () => {
  return (
  <div className="section-2 py-5">
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
  TRANG PHỤC TRONG NGÀY
</h2>

     <div className="row mt-4">
    <div className="col-md-4">
      <div className="product-card position-relative">
        <img src={OutFit1} alt="Demo 1" className="img-fluid w-100 h-50"  />
      </div>
    </div>
  
    <div className="col-md-4">
      <div className="product-card position-relative">
        <img src={OutFit2} alt="Demo 2" className="img-fluid w-100 h-50" />
      </div>
    </div>
  
    <div className="col-md-4">
      <div className="product-card position-relative">
        <img src={OutFit3} alt="Demo 3" className="img-fluid w-100 h-50" />
      </div>
    </div>
  
    
  </div>
  
  
  
               </div>
      </div>
  )
}

export default OutFitTheDay