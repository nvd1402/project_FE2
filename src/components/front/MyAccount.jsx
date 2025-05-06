import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import UserSidebar from '../UserSidebar'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from '../Http'
import { toast } from 'react-toastify'
import Loader from '../Loader'

const MyAccount = () => {
    const [loader, setLoader] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            setLoader(true);
            try {
                const response = await fetch(`${apiUrl}/get-account-detail`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken()}`
                    },
                });

                const result = await response.json();

                reset({
                    name: result.data.name || '',
                    email: result.data.email || '',
                    mobile: result.data.mobile || '',
                    address: result.data.address || ''
                });

            } catch (error) {
                console.error('Error loading account data:', error);
            } finally {
                setLoader(false);
            }
        };

        fetchAccountDetails();
    }, [reset]);

    const updateAccount = async (data) => {
        setLoader(true);
        
            const response = await fetch(`${apiUrl}/update-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.status === 200) {
                toast.success(result.message);
            }
            else {
                toast.error(result.message);
            }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className='h4 pb-0 mb-0'>My Account</h4>
                    </div>
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(updateAccount)}>
                            {loader && <Loader />}
                            <div className="card shadow mb-4">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="name" className='form-label'>Name</label>
                                            <input
                                                {...register("name", {
                                                    required: 'Name is required'
                                                })}
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Enter Name"
                                            />
                                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="email" className='form-label'>Email</label>
                                            <input
                                                {...register("email", {
                                                    required: 'Email is required'
                                                })}
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter Email"
                                            />
                                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="address" className='form-label'>Address</label>
                                            <textarea
                                                {...register("address", {
                                                    required: 'Address is required'
                                                })}
                                                className="form-control"
                                                id="address"
                                                rows="3"
                                                placeholder="Enter Address"
                                            ></textarea>
                                            {errors.address && <div className="text-danger">{errors.address.message}</div>}
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="mobile" className='form-label'>Mobile</label>
                                            <input
                                                {...register("mobile", {
                                                    required: 'Phone is required'
                                                })}
                                                type="text"
                                                className="form-control"
                                                id="mobile"
                                                placeholder="Enter Phone"
                                            />
                                            {errors.mobile && <div className="text-danger">{errors.mobile.message}</div>}
                                        </div>
                                    </div>
                                    <button className='btn btn-primary'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyAccount;
