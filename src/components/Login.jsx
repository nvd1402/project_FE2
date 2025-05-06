import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { apiUrl } from './Http';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import Layout from './Layout';
import { toast } from 'react-toastify';


const Login = () => {
    const { login } = useContext(AuthContext);
    const { 
                register, 
                handleSubmit, 
                setError,
                formState: { errors },
             } = useForm();
             const navigate = useNavigate();

         const onSubmit = async (data) => {
          const res = await fetch(`${apiUrl}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          const result = await res.json();
          if(result.status == 400){
              const userInfo = {
                token: result.token,
                id: result.id,
                name: result.name,
              }
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              login(userInfo);
              navigate('/account/profile');

          }else{
            const formErrors = result.errors;
            if (result.message) {
                toast.error(result.message); // ví dụ: "Sai tài khoản hoặc mật khẩu!"
            }
                Object.keys(formErrors).forEach((field) => {
                    setError(field, { message: formErrors[field][0] });
                })
          }
        };
  return (
    <Layout>
    <div className="container d-flex justify-content-center py-5">
    <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow border-0 m-3">
            <div className="card-body p-4">
                <h3 className="text-center">Đăng nhập</h3>
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
                <div className="d-flex pt-2">
                    Bạn chưa có tài khoản? &nbsp;  <Link to='/account/login'>Đăng ký ngay</Link>
                </div>

            </div>
            </div>
            </form>
    </div>
</Layout>
  )
}

export default Login