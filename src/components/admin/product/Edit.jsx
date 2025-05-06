import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../../Http'
import Loader from '../../Loader'
import Layout from '../../Layout'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import  {  useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Edit = ({placeholder}) => {
  const editor = useRef(null);
    const [content, setContent] = useState('');
      const [categories, setCategories] = useState([]);
      const [disable, setDisable] = useState(false);
      const [brands, setBrands] = useState([]);
      const [sizes, setSizes] = useState([]);
      const [sizesChecked, setSizeChecked] = useState([]);
      const [productImages, setProductImages] = useState([]);
    //   const [galleryImages, setGalleryImages] = useState([]);
      const navigate = useNavigate([]);
      const params  = useParams();
  
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
                  reset,
                  formState: { errors },
               } = useForm({
                defaultValues: async () => {
                 const res = await fetch(`${apiUrl}/products/${params.id}`,{
                  method: 'GET',
                  headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${adminToken()}`
                      }

                 });
                 const result = await res.json();
                 if(result.status === 200){
                  setProductImages(result.data.product_images);
                  setSizeChecked(result.productSizes);
                  reset({
                    title: result.data.title,
                    description: result.data.description,
                    short_description: result.data.short_description,
                    qty : result.data.qty,
                    sku : result.data.sku,
                    price: result.data.price,
                    compare_price: result.data.compare_price,
                    barcode: result.data.barcode,
                    brand: result.data.brand_id,
                    category: result.data.category_id,
                    status : result.data.status,
                    is_featured: result.data.is_featured

                  })
                }
              }

               });
      
               const updateProduct = async (data) =>{
                               console.log(data);
                               const formData = { ...data,"description" :content };
               
                               setDisable(true);
                               const res = await fetch(`${apiUrl}/products/${params.id}`,{
                                   method: 'PUT',
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
              
                  
            //   const handleFile = async (e) => {
            //           const formData = new FormData();
            //           const file = e.target.files[0];
            //           formData.append('image', file);
            //           setDisable(true);
                      
            //           const res =  await fetch(`${apiUrl}/save-product-image`,{
            //             method: 'POST',
            //             headers: {
                           
            //                 'Authorization': `Bearer ${adminToken()}`
            //             },
            //             body: formData
            //           })
            //           .then(res => res.json())
            //           .then(result => {
            //             if(result.status == 200){
            //                 productImages.push(result.data);
            //                 setProductImages(productImages);
            //             } else{
            //                 toast.error(result.errors.image[0]);
            //             }
            //             setDisable(false);
            //             e.target.value = "";
            //           })
                  
                      
            // };
            

            const handleFile = async (e) => {
                if (!params.id) {
                    toast.error("Không tìm thấy product_id trong URL!");
                    return;
                }
            
                const formData = new FormData();
                const file = e.target.files[0];
            
                if (!file) {
                    toast.error("Vui lòng chọn một tệp ảnh!");
                    return;
                }
            
                formData.append('image', file);
                formData.append('product_id', params.id); // Thêm product_id vào form
            
                setDisable(true);
            
                try {
                    const res = await fetch(`${apiUrl}/save-product-image`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${adminToken()}`
                        },
                        body: formData
                    });
            
                    const result = await res.json();
            
                    if (result.status === 200) {
                        setProductImages([...productImages, result.data]);
                        toast.success("Tải ảnh lên thành công!");
                    } else {
                        toast.error(result.error?.product_id?.[0] || "Có lỗi xảy ra!");
                    }
                } catch (error) {
                    console.error("Lỗi upload ảnh:", error);
                    toast.error("Không thể tải ảnh lên, vui lòng thử lại!");
                } finally {
                    setDisable(false);
                    e.target.value = "";
                }
            };
            
            
              const changeImage = async (image) => {
                const res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image${image}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    }
                    });
                    const result = await res.json();
                    if(result.status == 200){
                        toast.success(result.message);
                    } else{
                        toast.error(result.message);
                    }
              }
              const deleteImage = async (id) =>{
                if(confirm(" Are you sure you want to delete this image")){
                    const res = await fetch(`${apiUrl}/delete-product-image/${id}`,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${adminToken()}`
                        }
                        });
                        const result = await res.json();
                        if(result.status == 200){
                            toast.success(result.message);
                            setProductImages(productImages.filter(productImage => productImage.id!== id));
                        } else{
                            toast.error(result.message);
                        }
                    }
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
         <h3 className='pb-0 mb-0'>Products / Edit</h3>
         <Link to="/admin/products" className="btn btn-primary">Back</Link>
         
       </div>
       <div className="col-md-3">
        <Sidebar/>
       </div>
       <div className="col-md-9">
       <form onSubmit={handleSubmit(updateProduct)} >
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
                           ...register("short_description",{
                                       required: 'The description is required'
                                   })
                       }
                       className='form-control ' placeholder='Short Description' rows={3}></textarea>
                       {
                           errors.short_description && <span className='text-danger'>{errors.short_description.message}</span>
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
                                   errors.discount_price && <span className='text-danger'>{errors.compare_price.message}</span>
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
                   
                   <h3 className='py-3 border-bottom mb-3'>Gallery </h3>
                   <div className="mb-3">
                       <label htmlFor="" className='form-label'>Image</label>
                       <input 
                       onChange={handleFile}
                       type="file" className='form-control'  />
                   </div>

                   <div className="mb-3">
                       
                        <div className="row">
                      {productImages.map((productImage, index) => (
                       <div className='col-md-3' key={`image-${index}`}>
                           <div className="card shadow">
                               <img src={productImage.image_url} alt={`Image ${index}`} className='w-100' onError={(e) => {console.error("Lỗi ảnh:", e.target.src);e.target.src = "https://via.placeholder.com/150"; }}/>
                               <button type='button' className='btn btn-danger' onClick={() =>deleteImage(productImage.id)}>Delete</button>
                               <button type='button' className='btn btn-secondary mt-3 w-100' onClick={() => changeImage(productImage.image)}>Set as Default</button>
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