
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { adminToken, apiUrl } from '../../Http'
import Loader from '../../Loader'
import Layout from '../../Layout'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import  {  useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
const Create = ({placeholder}) => {
 
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [disable, setDisable] = useState(false);
    const [brands, setBrands] = useState([]);
     const [sizesChecked, setSizeChecked] = useState([]);
     const [sizes, setSizes] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const navigate = useNavigate([]);

	const config = useMemo(() => ({
			readonly: false, 
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);
   
    const { 
                register, 
                handleSubmit, 
                setError,
                formState: { errors },
             } = useForm();
        const createProduct = async (data) =>{
                console.log(data);
                const formData = { ...data,"description" :content,"gallery":gallery };

                setDisable(true);
                const res = await fetch(`${apiUrl}/products`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    },
                    body: JSON.stringify(formData),
                })
                const result = await res.json();
                setDisable(false);
                if(result.status == 200){
                    toast.success(result.message);
                    navigate('/admin/products');
                    
                }else{
                    const formErrors = result.errors;
                Object.keys(formErrors).forEach((field) => {
                    setError(field, { message: formErrors[field][0] });
                })
                }
            }

        const fetchCategories = async () =>{
            const res = await fetch(`${apiUrl}/categories`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            });
            const result = await res.json();
            if(result.status == 200){
                setCategories(result.data);
            }else{
                toast.error(result.message);
            }
            }
        const fetchBrands = async () =>{
            const res = await fetch(`${apiUrl}/brands`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
                });
                const result = await res.json();
                if(result.status == 200){
                    setBrands(result.data);
                } else{
                    toast.error(result.message);
                }
            }
        const fetchSizes = async () => {
                        const res = await fetch(`${apiUrl}/sizes`,{
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${adminToken()}`
                            }
                        } )
                        const result = await res.json();
                        if(result.status == 200){
                            setSizes(result.data);
                        }
                       }
        
            
        const handleFile = async (e) => {
                const formData = new FormData();
                const file = e.target.files[0];
                formData.append('image', file);
                setDisable(true);
            
                try {
                    const response = await fetch(`${apiUrl}/temp-images`, {
                        method: 'POST',
                        headers: {
                            'Accept': "application/json",
                            'Authorization': `Bearer ${adminToken()}`
                        },
                        body: formData
                    });
            
                    const result = await response.json();
                    console.log(result); 
            
                    if (result.status === 200) {
                        gallery.push(result.data.id);
                        setGallery(gallery);
                        galleryImages.push(result.data.image_url);
                        setGalleryImages(galleryImages);
                        toast.success("Image uploaded successfully");
                    
                    } else {
                        console.error("Upload error:", result.error);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                } finally {
                    setDisable(false);
                }
            };

        const deleteImage = (image) => {
            const newGallery = galleryImages.filter(galary => galary != image);
            setGalleryImages(newGallery);
        }
        
        
    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchSizes();
    }, []);

    

return (
    <Layout>
     <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-4">
          <h3 className='pb-0 mb-0'>Product / Create</h3>
          <Link to="/admin/products" className="btn btn-primary">Back</Link>
          
        </div>
        <div className="col-md-3">
         <Sidebar/>
        </div>
        <div className="col-md-9">
        <form onSubmit={handleSubmit(createProduct)} >
            <div className="card shadow">
                <div className="card-body p-4">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"> Name</label>
                        <input 
                        {
                            ...register("title",{
                                required: 'The name is required'
                            })
                        }
                        type="text" className="form-control" id="title" placeholder='Name'/>
                        {errors.title && <span className='text-danger'>{errors.title.message}</span>}
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                             <div className="mb-3">
                                <label className='mb-2' htmlFor="category">Category</label>
                                <select 
                                {
                                    ...register("category",{
                                        required: 'The category is required'
                                    })
                                }
                                 className='form-control'>
                                    <option value="">Select a Category</option>
                                    {
                                        categories.map((category) =>{
                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                        })
                                    }
                                </select>
                                {errors.category && <span className='text-danger'>{errors.category.message}</span>}
                               
                             </div>
                        </div>
                        <div className="col-md-6">
                        <div className="mb-3">
                                <label className='mb-2' htmlFor="brand">Brand</label>
                                <select
                                   {
                                    ...register("brand",{
                                        required: 'The brand is required'
                                    })
                                   }
                                   className='form-control'>
                                    <option value="">Select a Brand</option>
                                    {
                                        brands.map((brand) =>{
                                            return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        })
                                    }
                                </select>
                                
                             </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className='mb-2'>
                            Short Description
                        </label>
                        <textarea
                        {
                            ...register("description",{
                                        required: 'The description is required'
                                    })
                        }
                        className='form-control ' placeholder='Short Description' rows={3}></textarea>
                        {
                            errors.description && <span className='text-danger'>{errors.description.message}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor=""className='mb-2'>Description</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} 
                            onBlur={newContent => setContent(newContent)} 
                           
		                  />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className='mb-2' htmlFor="">Price</label>
                                <input {
                                    ...register("price", {
                                        required: 'The price is required',
                                    })
                                } type="text" className='form-control' placeholder='Price' />
                                {
                                    errors.price && <span className='text-danger'>{errors.price.message}</span>
                                }

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className='mb-2' htmlFor="">Discount Price</label>
                                <input 
                                {
                                    ...register("compare_price", {
                                        required: 'The discount price is required',
                                    })
                                }
                                type="text" className='form-control' placeholder='Discount Price' />
                                {
                                    errors.compare_price && <span className='text-danger'>{errors.compare_price.message}</span>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className='mb-2'>SKU</label>
                                <input
                                {
                                    ...register("sku",{
                                        required: 'The sku is required',
                                    } )
                                }
                                type="text" className='form-control' placeholder='SKU' />
                                {
                                    errors.sku && <span className='text-danger'>{errors.sku.message}</span>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className='mb-2'>Barcode</label>
                                <input
                                {
                                    ...register("barcode",{
                                        required: 'The barcode is required',
                                    } )
                                }
                                type="text" className='form-control' placeholder='Barcode' />
                                {
                                    errors.barcode && <span className='text-danger'>{errors.barcode.message}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className='mb-2'>Qty</label>
                                <input 
                                {
                                    ...register("qty",{
                                        required: 'The quantity is required',
                                    })
                                }
                                type="text" className='form-control' placeholder='Quantity' />
                                {
                                    errors.qty && <span className='text-danger'>{errors.qty.message}</span>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
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
                    <div className="mb-3">
                    <label htmlFor="" className='form-label'>Sizes</label>
                    {
                        sizes.map(size => {
                            return (
                              <div className="form-check-inline ps-2" key={`size-${size.id}`}>
                                <input 
                                {
                                    ...register("sizes")
                                }
                                checked={sizesChecked.includes(size.id)}
                                onChange={(e) =>{
                                    if(e.target.checked){
                                        setSizeChecked([...sizesChecked, size.id]);
                                    }else{
                                        setSizeChecked(sizesChecked.filter(sid => sid!== size.id));
                                    }
                                }}
                                className='form-check-input' type='checkbox' value={size.id} id={`size-{size.id}`} />
                                <label className='form-check-label ps-2' htmlFor ="{`size-${size.id}`}">
                                    {size.name}
                                </label>
                              </div>
                            )
                        })
                    }
                    
                   </div>
                   <div className="mb-3">
                    <label htmlFor="" className='form-label'>Featured</label>
                    <select {
                      ...register("is_featured",{
                        required: 'The featured is required'
                      })
                    } className='form-control'>
                      <option value="">Select a Featured</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {
                         errors.is_featured && <span className='text-danger'>{errors.is_featured.message}</span>
                       }
                   </div>
                    
                    <h3 className='py-3 boder-bottom mb-3'>Gallery </h3>
                    <div className="mb-3">
                        <label htmlFor="" className='form-label'>Image</label>
                        <input 
                        onChange={handleFile}
                        type="file" className='form-control'  />
                    </div>
                    

                    <div className="mb-3">
                        
                         <div className="row">
                       {galleryImages.map((image, index) => (
                        <div className='col-md-3' key={`image-${index}`}>
                            <div className="card shadow">
                                <img src={image} alt={`Image ${index}`} className='w-100' onError={(e) => {console.error("Lỗi ảnh:", e.target.src);e.target.src = "https://via.placeholder.com/150"; }}/>
                                <button className='btn btn-danger' onClick={() =>deleteImage(image)}>Delete</button>
                            </div>
                        </div>
                          ))}
                    </div>

                    </div>



                </div>
            </div>
            <div >
                <button 
                
                    disabled={disable}
                
                type="submit" className="btn btn-primary  mt-4">Create</button>
            </div>
         </form>

        </div>
      </div>
     </div>
    </Layout>
  )

}
export default Create
