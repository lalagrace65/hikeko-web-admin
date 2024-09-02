import Layout from "@/components/Layout";
import TravelAgencyForm from "@/components/Forms/TravelAgencyForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditTravelAgencyPage() {
    const [travelAgencyInfo, setTravelAgencyInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/travelAgency?id='+id).then(response => {
            setTravelAgencyInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1>Edit Travel Agency</h1>
            {travelAgencyInfo && (
                <TravelAgencyForm {...travelAgencyInfo}/>
            )}
            
        </Layout>
    );
}