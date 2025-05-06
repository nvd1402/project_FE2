import React, { useState } from 'react'
import Layout from '../../Layout'
import Sidebar from '../Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../Http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate([]);
    const { 
                register, 
                handleSubmit, 
                formState: { errors },
             } = useForm();
    const createBrand =  async (data) => {
        setDisable(true);
        const res = await fetch(`${apiUrl}/brands`,{
            method: 'POST',
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
            navigate('/admin/brands');
        }else{
            toast.error(result.message);
        }

    }
  return (
   <Layout>
      <div className="container">
        <div className="row">
            <div className="d-flex justify-content-between mt-3">
                <h1>Create Brands</h1>
                <Link to={`/admin/brands`}><button className='btn btn-primary'>Back</button></Link>
            </div>
            <div className="col-md-3">
            <Sidebar/>
            </div>
            <div className="col-md-9">
                 <form onSubmit={handleSubmit(createBrand)} >
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
                                <label className="form-label">Status</label>
                                <select {
                                    ...register("status",{
                                        required: "The status is required"
                                    })
                                } name="status" id="status" className='form-control'>
                                    <option value="">Select a Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Block</option>
                                </select>
                                {errors.status && <span className="text-danger">{errors.status.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className=" mt-3">
                        <button 
                        disabled={disable}                        
                        type="submit" className="btn btn-primary">Create</button>
                    </div>
                 </form>
            </div>
        </div>
      </div>
   </Layout>
  )
}

export default Create