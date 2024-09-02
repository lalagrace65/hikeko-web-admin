import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


export default function CouponForm({
    _id,
    title:existingTitle,
    discount:existingDiscount,
    quantity:existingQuantity,
    
}){
    const[title, setTitle] = useState(existingTitle || '');
    const[discount,setDiscount] = useState(existingDiscount || '');
    const[quantity,setQuantity] = useState(existingQuantity || '');
    
    const[goToCoupons, setGoToCoupons] = useState(false);
    const router = useRouter();
    
    async function saveCoupon(ev){
        ev.preventDefault();
        const data = {title,discount,quantity};
        if (_id){
            //update 
            await axios.put('/api/coupons', {...data,_id});
        }else{
            //create
            await axios.post('/api/coupons', data);
        }
        //redirect to Trails - meaning updated
        setGoToCoupons(true);
    }
    
    if (goToCoupons){
        router.push('/coupons') ;
    }
    


    return (
        
            <form onSubmit={saveCoupon}>
            <label>Coupon Code</label>
                <input 
                    type="text" 
                    placeholder="Code e.g SALE50"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            <label>Discount</label>
                <input
                    type="number" 
                    placeholder="Discount %i.e 1-99" 
                    value={discount} 
                    onChange={ev => setDiscount(ev.target.value)}
                />
            <label>Quantity</label>
                <input 
                    type="number" 
                    placeholder="quantity"
                    value={quantity}
                    onChange={ev => setQuantity(ev.target.value)}
                />
            
            <button 
                type= "submit"
                className="btn-primary">Save</button>
            </form>
       
    );
}