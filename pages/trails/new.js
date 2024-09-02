import Layout from "@/components/Layout";
import TrailForm from "@/components/Forms/TrailForm";

export default function NewTrail(){
    return (
        <Layout>
            <h1>New Trail</h1> {/* style is in global */}
            <TrailForm/>
        </Layout>
    );
}