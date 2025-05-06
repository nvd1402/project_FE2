import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { apiUrl } from './Http';
import { toast } from 'react-toastify';

const Register = () => {
    const { 
            register, 
            handleSubmit, 
            setError,
            formState: { errors },
         } = useForm();
         const navigate = useNavigate();

         const onSubmit = async (data) => {
          const res = await fetch(`${apiUrl}/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          const result = await res.json();
          if(result.status == 400){
             toast.success(result.message);
             navigate('/account/login')
          }else{
            const formErrors = result.errors;
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
                <h3 className="text-center">Đăng ký</h3>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                    {
                        ...register("name",{
                            required: "Bạn chưa nhập tên đăng nhập",
                           
                         })
                        
                         
                    }
                    type="text" className="form-control" id="name" placeholder="Tên đăng nhập"  />
                    {
                        errors.name && <span className="text-danger">{errors.name.message}</span>
                    }
                </div>
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
                <button type="submit" className="btn btn-primary ms-5">Đăng ký</button>
                <div className="d-flex pt-2">
                    Bạn đã có tài khoản? &nbsp; <a href="#">Đăng nhập ngay</a>
                </div>

            </div>
            </div>
            </form>
    </div>
</Layout>
  )
}

export default Register