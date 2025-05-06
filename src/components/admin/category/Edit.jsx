
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Layout from '../../Layout'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../../Http';
import { toast } from 'react-toastify';
const Edit = () => {

        const [disable, setDisable] = useState(false);
        const navigate = useNavigate([]);
        const params = useParams();
        const { 
                register, 
                handleSubmit, 
                reset,
                formState: { errors },
             } = useForm({
                defaultValues: async () => {
                    const res = await fetch(`${apiUrl}/categories/${[params.id]}`,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${adminToken()}`
                        },
                        
                    })
                    const result = await res.json();

                    if(result.status == 200){
                      
                        reset({
                            name: result.data.name,
                            status : result.data.status,
                        })
                        
                    }else{
                        toast.error(result.message);
                    }
                }
             });
        const EditCategory = async (data) =>{
            setDisable(true);
            const res = await fetch(`${apiUrl}/categories/${params.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            })
            const result = await res.json();
            setDisable(false);
            if(result.status == 200){
                toast.success(result.message);
                navigate('/admin/categories');
                
            }else{
                toast.error(result.message);
            }
        }
    
  return (
    <Layout>
    <div className="container">
     <div className="row">
       <div className="d-flex justify-content-between mt-5 pb-4">
         <h3 className='pb-0 mb-0'> Edit Categories</h3>
         <Link to="/admin/categories" className="btn btn-primary">Back</Link>
         
       </div>
       <div className="col-md-3">
        <Sidebar/>
       </div>
       <div className="col-md-9">
        <form onSubmit={handleSubmit(EditCategory)} >
           <div className="card shadow">
               <div className="card-body p-4">
                   <div className="mb-3">
                       <label htmlFor="name" className="form-label"> Name</label>
                       <input 
                       {
                           ...register("name",{
                               required: 'The name is required'
                           })
                       }
                       type="text" className="form-control" id="name" placeholder='Name'/>
                       {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                   </div>
                   <div className="mb-3">
                       <label htmlFor="" className='form-label'>Status</label>
                       <select 
                       {
                           ...register("status",{
                               required: 'The status is required'
                           })
                       }
                       className='form-control'>
                           <option value="">Select a Status</option>
                           <option value="1">Active</option>
                           <option value="0">Block</option>
                       </select>
                       {
                           errors.status && <span className='text-danger'>{errors.status.message}</span>
                       }
                   </div>


               </div>
           </div>
           <div >
               <button 
               
                   disabled={disable}
               
               type="submit" className="btn btn-primary  mt-4">Update</button>
           </div>
        </form>

       </div>
     </div>
    </div>
   </Layout>
  )
}

export default Edit