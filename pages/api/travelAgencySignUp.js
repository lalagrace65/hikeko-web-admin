import { TravelAgencySignUp } from "@/models/TraveAgencySignUp";
import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET'){
        if(req.query?.id){
            res.json(await TravelAgencySignUp.findOne({_id:req.query.id}));
        } else {
            res.json(await TravelAgencySignUp.find({}, 'isVerified ownerFirstName ownerLastName businessEmail ownerMobileNum businessName businessAddress contactNumber birCertificatePhoto dtiPermitPhoto businessPermitPhoto mayorsPermitPhoto'));
        }
    }

    

    
}