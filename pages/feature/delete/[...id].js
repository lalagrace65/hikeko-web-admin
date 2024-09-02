import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteFeaturePage(){
    const router =useRouter();
    const[featureInfo,setFeatureInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/features?id='+id).then(response => {
            setFeatureInfo(response.data);
        });
    }, [id]);

    function goBack(){
        router.push('/features');
    }
    async function deleteFeature(){
        await axios.delete('/api/features?id=' +id);
        goBack();
    }
    return(
        <Layout>
            <h1 className="text-center">Do you really want to delete 
                &nbsp;&quot;{featureInfo?.title}&quot;?
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteFeature}>
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