import { BrowserRouter, Routes } from "react-router-dom"

import  Home  from "./components/Home"
import Shop  from "./components/Shop"
import Cart  from "./components/Cart"
// import ProductDetail from "./components/ProductDetail"
// import Cart from "./components/Cart"
import { Route } from "react-router-dom"
import ProductDetail from "./components/ProductDetail"
import Checkout from "./components/Checkout"
import Login from "./components/admin/Login"
import { ToastContainer } from 'react-toastify';
import Dashboard from "./components/admin/Dashboard"
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth"
import {default as ShowCategories} from "./components/admin/category/Show"
import CreateCategory from "./components/admin/category/Create"
import EditCategory from "./components/admin/category/Edit"

import ShowBrands from "./components/admin/brand/Show"
import CreateBrand from "./components/admin/brand/Create"
import EditBrand from "./components/admin/brand/Edit"
import ShowProducts from "./components/admin/product/Show"
import CreateProduct from "./components/admin/product/Create"
import EditProduct from "./components/admin/product/Edit"
import Register from "./components/Register"
import LoginUser from "./components/Login"
import { RequireAuth } from "./components/RequireAuth"
import ThanksOrder from "./components/ThanksOrder"
import ShowOrders from "./components/admin/orders/ShowOrders"
import OrderDetails from "./components/admin/orders/OrderDetail"
import MyOrders from "./components/front/MyOrders"
import UserOrderDetail  from  "./components/front/OrderDetail"
import MyAccount from "./components/front/MyAccount"
import Shipping from "./components/admin/shipping/Shipping"
import ShowUser from "./components/admin/users/Show"
import CreateUser from "./components/admin/users/Create"
import UpdateUser from "./components/admin/users/Edit"
import AboutUs from "./components/AboutUs"

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account/register' element={< Register />} />
        <Route path='/account/login' element={<LoginUser/>} />

          
        <Route path='/about-us' element={<AboutUs />} />


        <Route path='/account/profile' element={
          <RequireAuth>
             <MyAccount />
          </RequireAuth>
         } />
         <Route path='/account/orders' element={
          <AdminRequireAuth>
          <MyOrders />
          </AdminRequireAuth>
        }/>
         <Route path='/account/orders/details/:id' element={
          <AdminRequireAuth>
          <UserOrderDetail />
          </AdminRequireAuth>
        }/>

        <Route path='/order/thanksOrder/:id' element={
                <RequireAuth>
                  < ThanksOrder />
                </RequireAuth>
                } />
       <Route path='/checkout' element={
        <RequireAuth>
          <Checkout />
        </RequireAuth>
        } />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <AdminRequireAuth>
          <Dashboard/>
          </AdminRequireAuth>
        }/>
        <Route path="/admin/categories" element={
          <AdminRequireAuth>
          <ShowCategories />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/categories/create" element={
          <AdminRequireAuth>
          <CreateCategory />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/categories/edit/:id" element={
          <AdminRequireAuth>
          <EditCategory />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/brands" element={
          <AdminRequireAuth>
          <ShowBrands />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/brands/create" element={
          <AdminRequireAuth>
          <CreateBrand />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/brands/edit/:id" element={
          <AdminRequireAuth>
          <EditBrand />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/products" element={
          <AdminRequireAuth>
          <ShowProducts />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/products/create" element={
          <AdminRequireAuth>
          <CreateProduct />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/products/edit/:id" element={
          <AdminRequireAuth>
          <EditProduct />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/orders" element={
          <AdminRequireAuth>
          <ShowOrders />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/orders/:id" element={
          <AdminRequireAuth>
          <OrderDetails />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/shipping" element={
          <AdminRequireAuth>
          <Shipping />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/users" element={
          <AdminRequireAuth>
          <ShowUser />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/users/create" element={
          <AdminRequireAuth>
          <CreateUser />
          </AdminRequireAuth>
        }/>
        <Route path="/admin/users/:id" element={
          <AdminRequireAuth>
          <UpdateUser />
          </AdminRequireAuth>
        }/>

      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
