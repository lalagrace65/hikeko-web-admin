import Layout from "@/components/Layout";
import CouponForm from "@/components/Forms/CouponForm";

export default function NewCoupon(){
    return (
        <Layout>
            <h1>New Coupon</h1> {/* style is in global */}
           <CouponForm/>
        </Layout>
    );
}