
import { useEffect, useState } from "react";
import { createContext } from "react";
import { apiUrl } from "../Http";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [shippingCost, setShippingCost] = useState(0);
    const addToCart = (product, size=null) =>{

        
        let updatedCart = [...cartData];
  
        //if cart is empty
        if(cartData.length == 0){
            updatedCart.push({
                id : `${product.id}-${Math.floor(Math.random()*100000)}`,
                product_id : product.id,
                size: size,
                title: product.title,
                price: product.price,
                qty: 1,
                image_url: product.image_url
            })
        } else{
            //if size is not empty
            if(size != null){
                const isProductExist = updatedCart.find(item => 
                    item.product_id === product.id && item.size === size
                )
                //If product and size combnination exists
                if(isProductExist){
                    updatedCart = updatedCart.map(item =>
                    (item.product_id === product.id && item.size === size)
                    ? {...item, qty: item.qty + 1}
                    : item
                    )
                }else{
                    updatedCart.push({
                        id : `${product.id}-${Math.floor(Math.random()*100000)}`,
                        product_id : product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
                    })
                }
            } else{
                // when Size is null
                const isProductExist = updatedCart.find(item => item.product_id === product.id);
                if(isProductExist){
                    updatedCart = updatedCart.map(item =>
                        (item.product_id === product.id)
                        ? {...item, qty: item.qty + 1}
                        : item
                    )
                }else{
                    updatedCart.push({
                        id : `${product.id}-${Math.floor(Math.random()*100000)}`,
                        product_id : product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
                    })
                }
            }
            
        }
        setCartData(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    
    const shipping = () => {
        let shippingAmount = 0;
        cartData.map(item => {
            shippingAmount += item.qty * shippingCost
        })
        return shippingAmount;
    }
    useEffect(() =>{
        fetch(`${apiUrl}/get-shipping-front`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(result => {
            if(result.status == 200){
                setShippingCost(parseFloat(result.data.shipping_charge));
            } else{
                console.log(result.message);
            }
        })
    },[]);

    const subTotal = () => {
        let subtotal = 0;
        cartData.map(item => {
            subtotal += item.price * item.qty;
        })
        return subtotal;
    }
    const grandTotal = () => {
        return subTotal() + shipping();
    }
    const updateCartItem = (itemId, newQty) =>{
        let updatedCart = [...cartData];
        updatedCart = updatedCart.map(item =>
            (item.id === itemId)
            ? {...item, qty: newQty}
            : item
        )
        setCartData(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    const deleteCartItem = (itemId) => {
        const newCartData = cartData.filter(item => item.id != itemId)
        setCartData(newCartData)
        localStorage.setItem('cart', JSON.stringify(newCartData))
    }
    const getQty = () => {
        let qty = 0;
        cartData.map(item => {
            qty += parseInt(item.qty);
        });
        return qty;
    }
   
    return (
        <CartContext.Provider value={{ cartData,getQty, addToCart, grandTotal, subTotal,shipping, updateCartItem,deleteCartItem }}>
            {children}
        </CartContext.Provider>
    )
}