import Layout from "@/components/Layout";
import TravelAgencyForm from "@/components/Forms/TravelAgencyForm";

export default function NewTravelAgency(){
    return (
        <Layout>
            <h1>New TravelAgency</h1> {/* style is in global */}
            <TravelAgencyForm/>
        </Layout>
    );
}