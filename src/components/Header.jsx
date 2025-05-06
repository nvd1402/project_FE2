import React  from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/images/logo.webp'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './context/Cart1';

const Header = () => {
  const {getQty} = useContext(CartContext);
  //  const fetchCategories = async () => {
  //       const res = await fetch(`${apiUrl}/get-categories`,{
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${adminToken()}`
  //         },
  //       })
  //       const result = await res.json();
  //       if(result.status == 200) {
  //         setCategories(result.data)
  //       }else{
  //         console.log(result.message)
  //       }
  //   }
  //   useEffect(() =>{
  //     fetchCategories()
  //   },[]);
  return (
    <header className='shadow'>
            
    <Navbar expand="lg" className="bg-body-tertiary ps-5">
    <Navbar.Brand href="#" className="d-flex align-items-center">
            <img src={Logo} alt="Logo" width="50" height="50" className="d-inline-block me-3" />
              <span className="pt-1">Fashion Store</span>
    </Navbar.Brand>

{/* <Navbar.Brand href="#">Fashion Store</Navbar.Brand> */}
<Navbar.Toggle aria-controls="navbarScroll" />
<Navbar.Collapse id="navbarScroll">
  <Nav
    className="ms-auto   my-2 my-lg-0"
    style={{ maxHeight: '100px' }}
    navbarScroll
  >
    


<Nav>
    <Nav.Link as={Link} className='pe-3' to="/">Trang Chủ</Nav.Link>
    <Nav.Link as={Link} className='pe-3' to="/shop">Cửa Hàng</Nav.Link>
    <Nav.Link as={Link} className='pe-3' to="/about-us">Về Chúng Tôi</Nav.Link>
    <Nav.Link as={Link} className='pe-5' to="/contact">Liên Hệ</Nav.Link>
</Nav>

  </Nav>
  <div className='nav-right d-flex pe-5'>
    <Link to="/cart" className='ms-3 cart-bucket' >
    
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path></svg>
    <span>{getQty()}</span>
    </Link>
    <Link to="/account/profile" className='ms-3'>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path></svg>

    </Link>

  </div>
  {/* <Form className="d-flex">
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
    />
    <Button variant="outline-success">Search</Button>
  </Form> */}
</Navbar.Collapse>
</Navbar>

</header>
  )
}

export default Header