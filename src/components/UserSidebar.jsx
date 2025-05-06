import React, { useContext } from 'react'
import { AuthContext } from './context/Auth';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
    const {logout} = useContext(AuthContext);
    return (
      <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <Link to="/account/profile">Tài khoản</Link>
          </li>
          <li>
            <Link to="/account/orders">Đơn hàng của tôi</Link>
          </li>
          <li>
            <a href="">Thay đổi mật khẩu</a>
          </li>
          <li>
            <a href="" onClick={logout}>Đăng xuất</a>
          </li>
        </ul>
      </div>
    </div>
    )
  }


export default UserSidebar