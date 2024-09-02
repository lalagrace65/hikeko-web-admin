import Layout from "@/components/Layout";
import CouponForm from "@/components/Forms/CouponForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditCouponPage() {
    const [couponInfo, setCouponInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/coupons?id='+id).then(response => {
            setCouponInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1>Edit Coupon</h1>
            {couponInfo && (
                <CouponForm {...couponInfo}/>
            )}
            
        </Layout>
    );
}