import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteTravelAgencyPage(){
    const router =useRouter();
    const[travelAgencyInfo,setTravelAgencyInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/travelAgency?id='+id).then(response => {
            setTravelAgencyInfo(response.data);
        });
    }, [id]);

    function goBack(){
        router.push('/travelAgency');
    }
    async function deleteTravelAgency(){
        await axios.delete('/api/travelAgency?id=' +id);
        goBack();
    }
    return(
        <Layout>
            <h1 className="text-center">Do you really want to delete 
                &nbsp;"{travelAgencyInfo?.title}"?
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteTravelAgency}>
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