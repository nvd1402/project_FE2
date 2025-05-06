import React, { useState } from 'react'
import Layout from '../../Layout'
import Sidebar from '../Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../Http';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Create = () => {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate([]);
    const params = useParams();
    const { 
                register, 
                handleSubmit, 
                reset,
                formState: { errors },
             } = useForm({
              defaultValues: async () =>{
                const res = await fetch(`${apiUrl}/users/${params.id}`,{
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${adminToken()}`,
                      'Content-Type': 'application/json'
                  },
                  
              })
              const result = await res.json();
              setDisable(false);
              if(result.status == 200){
                 reset ({
                  name: result.data.name,
                  email: result.data.email,
                  password: result.data.password,
                  role: result.data.role,
                  mobile: result.data.mobile,
                  address: result.data.address
                 })
              }else{
                  toast.error(result.message);
              }
              }
             });
    const updateUser =  async (data) => {
        setDisable(true);
        const res = await fetch(`${apiUrl}/users/${params.id}`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${adminToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        })
        const result = await res.json();
        setDisable(false);
        if(result.status == 200){
            toast.success(result.message);
            navigate('/admin/users');
        }else{
            toast.error(result.message);
        }

    }
  return (
   <Layout>
      <div className="container">
        <div className="row">
            <div className="d-flex justify-content-between mt-3">
                <h1>Update Users</h1>
                <Link to={`/admin/users`}><button className='btn btn-primary'>Back</button></Link>
            </div>
            <div className="col-md-3">
            <Sidebar/>
            </div>
            <div className="col-md-9">
            <form onSubmit={handleSubmit(updateUser)} >
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                {
                                    ...register("name",{
                                        required: "The name is required"
                                    } )
                                }
                                type="text" className='form-control' placeholder='Name' id='name' />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                {
                                   ...register("email",{
                                        required: "The email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })
                                }
                                type="email" className='form-control' placeholder='Email' id='email' />
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input 
                                {
                                   ...register("password",{
                                        required: "The password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long"
                                        }
                                    })
                                }
                                type="password" className='form-control' placeholder='Password' id='password' />
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <textarea
                                {
                                    ...register("address",{
                                        required: "The address is required"
                                    })
                                } name="address" id="address" className='form-control' placeholder='Address' rows='3'></textarea>
                                {errors.address && <span className="text-danger">{errors.address.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input
                                {
                                    ...register("mobile",{
                                        required: "The mobile number is required",
                                    })
                                } type="tel" className='form-control' placeholder='Mobile' id='mobile' />
                                {errors.mobile && <span className="text-danger">{errors.mobile.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                {...register("role", { required: "The Role is required" })}
                                className="form-control"
                                >
                                <option value="">Select a Role</option>
                                <option value="admin">Admin</option>
                                <option value="customers">User</option>
                                </select>
                                {errors.role && <span className="text-danger">{errors.role.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                        <button 
                        disabled={disable}                        
                        type="submit" className="btn btn-primary">Update</button>
                    </div>
            </form>
            </div>
        </div>
      </div>
   </Layout>
  )
}

export default Create