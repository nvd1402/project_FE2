import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import Sidebar from '../Sidebar'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../Http';

const Shipping = () => {
    const [disable, setDisable] = useState(false);
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors },
    } = useForm();

    
    useEffect(() => {
        const fetchShipping = async () => {
            try {
                const res = await fetch(`${apiUrl}/get-shipping`, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    },
                });

                const result = await res.json();
                if (result.status === 200) {
                    reset({
                        shipping_charge: result.data.shipping_charge || ''
                    });
                } else {
                    toast.error(result.message);
                }
            } catch (err) {
                toast.error('Failed to fetch shipping info');
                console.error(err);
            }
        };

        fetchShipping();
    }, [reset]);

    const saveShipping = async (data) => {
        setDisable(true);
        try {
            const res = await fetch(`${apiUrl}/save-shipping`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.status === 200) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Something went wrong!');
            console.error(err);
        } finally {
            setDisable(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-4">
                        <h3 className='pb-0 mb-0'>Shipping Charge</h3>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(saveShipping)} >
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        <label htmlFor="shipping_charge" className="form-label">Shipping Charge</label>
                                        <input 
                                            {...register("shipping_charge", {
                                                required: 'The Shipping charge is required'
                                            })}
                                            type="text" 
                                            className="form-control" 
                                            id="shipping_charge" 
                                            placeholder='Shipping charge'
                                        />
                                        {errors.shipping_charge && <span className="text-danger">{errors.shipping_charge.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button disabled={disable} type="submit" className="btn btn-primary mt-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shipping;
