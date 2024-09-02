import FeaturedForm from "@/components/Forms/FeaturedForm";
import Layout from "@/components/Layout";


export default function NewFeature(){
    return (
        <Layout>
            <h1>New Feature</h1> {/* style is in global */}
            <FeaturedForm/>
        </Layout>
    );
}