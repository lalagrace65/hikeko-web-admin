import FeaturedForm from "@/components/Forms/FeaturedForm";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditFeaturePage() {
    const [featureInfo, setFeatureInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/features?id='+id).then(response => {
            setFeatureInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1>Edit Features</h1>
            {featureInfo && (
                <FeaturedForm {...featureInfo}/>
            )}
            
        </Layout>
    );
}