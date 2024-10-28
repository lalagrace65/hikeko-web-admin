import { TravelAgency } from "@/models/TravelAgency";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET'){
        if(req.query?.id){
            res.json(await TravelAgency.findOne({_id:req.query.id}));
        } else {
            res.json(await TravelAgency.find());
        }
    }

    if (method ==='POST') {
        const {travelAgencyName, email, password, confirmPassword,location, businessPermit, birCertificate, dtiPermit, mayorPermit} = req.body;
        const travelAgencyDoc = await TravelAgency.create({
            travelAgencyName, email, password, confirmPassword,location, businessPermit, birCertificate, dtiPermit, mayorPermit
        })
        res.json(travelAgencyDoc);
    }

    if (method ==='PUT'){
        const {travelAgencyName, email, password, confirmPassword,location, businessPermit, birCertificate, dtiPermit, mayorPermit, _id} = req.body;
       
        await TravelAgency.updateOne({_id}, {travelAgencyName, email, password, confirmPassword,location, businessPermit, birCertificate, dtiPermit, mayorPermit} );
        res.json(true);
    }

    if (method === 'DELETE'){
        if(req.query?.id){
            await TravelAgency.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}