import React, { useContext } from 'react'
import Layout from '../Layout'
import { useForm } from 'react-hook-form';
import { apiUrl } from '../Http';

import { toast } from'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {
    const {login} = useContext(AdminAuthContext);
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
     } = useForm();

     const navigate = useNavigate();

//   const onSubmit = async (data) =>{
//     console.log(data);

//     const res = await fetch(`${apiUrl}/admin/login`,{
//         method: 'POST',
//         headers: { 
//             'Content-Type': 'application/json'
//          },
//         body: JSON.stringify(data)
//     }).then(res => res.json())
//     .then(result => {
//         console.log(result);
//         if(result.status == 200){
//             const adminInfo = {
//                 token : result.token,
//                 id : result.id,
//                 name : result.name
//             }
//             localStorage.setItem('adminInfo',JSON.stringify(adminInfo));
//             toast.success('Đăng nhập thành công!');
//             navigate('/admin/dashboard');
//         }
//     })
    
    
//   }
const onSubmit = async (data) => {
   

    try {
        const res = await fetch(`${apiUrl}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();
       

        if (result.status === 200) {
            const adminInfo = {
                token: result.token,
                id: result.id,
                name: result.name
            };
            localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
            login(adminInfo);
            toast.success('Đăng nhập thành công!');
            navigate('/admin/dashboard');
        } else {
            toast.error(result.message || "Đăng nhập thất bại!");
        }
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        toast.error("Lỗi kết nối đến server!");
    }
};

  return (
    <Layout>
        <div className="container d-flex justify-content-center py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow border-0 m-3">
            <div className="card-body p-4">
                <h3 className="text-center">Admin Login</h3>
                <div className="mb-3">
                    <label htmlFor="email" className='form-label'>Email </label>
                    <input
                    {
                        ...register("email",{
                            required: "Bạn chưa nhập Email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                                message: "Email không đúng định dạng"
                            }
                        })
                    }
                    type="email" className="form-control" id="email" placeholder="Enter email"  />
                    {
                        errors.email && <span className="text-danger">{errors.email.message}</span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                    {
                        ...register("password",{
                            required: "Bạn chưa nhập mật khẩu",
                            minLength: { value: 5, message: "Mật khẩu phải đủ 5 ký tự" }
                        })
                    }
                    type="password" className="form-control" id="password" placeholder="Enter password"  />
                    {
                        errors.password && <span className="text-danger">{errors.password.message}</span>
                    }
    
                </div>
                <button type="submit" className="btn btn-primary ms-5">Đăng nhập</button>
                <div className="text-center">Bạn chưa có tài khoản? Đăng ký ngay</div>

            </div>
            </div>
            </form>
            
                
        </div>
    </Layout>
  )
}

export default Login