import Layout from "@/components/Layout";
import TrailForm from "@/components/Forms/TrailForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditTrailPage() {
    const [trailInfo, setTrailInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/trails?id='+id).then(response => {
            setTrailInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1>Edit Trail</h1>
            {trailInfo && (
                <TrailForm {...trailInfo}/>
            )}
            
        </Layout>
    );
}