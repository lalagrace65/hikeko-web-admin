import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteCouponPage(){
    const router =useRouter();
    const[couponInfo,setCouponInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/coupons?id='+id).then(response => {
            setCouponInfo(response.data);
        });
    }, [id]);

    function goBack(){
        router.push('/coupons');
    }
    async function deleteCoupon(){
        await axios.delete('/api/coupons?id=' +id);
        goBack();
    }
    return(
        <Layout>
            <h1 className="text-center">Do you really want to delete 
                &nbsp;"{couponInfo?.title}"?
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteCoupon}>
                    Yes
                </button>
                <button 
                    className="btn-default" 
                    onClick={goBack}>
                    No
                </button>
            </div>
           
        </Layout>
    )
}