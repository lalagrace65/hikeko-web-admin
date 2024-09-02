import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteTrailPage(){
    const router =useRouter();
    const[trailInfo,setTrailInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/trails?id='+id).then(response => {
            setTrailInfo(response.data);
        });
    }, [id]);

    function goBack(){
        router.push('/trails');
    }
    async function deleteTrail(){
        await axios.delete('/api/trails?id=' +id);
        goBack();
    }
    return(
        <Layout>
            <h1 className="text-center">Do you really want to delete 
                &nbsp;"{trailInfo?.title}"?
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteTrail}>
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