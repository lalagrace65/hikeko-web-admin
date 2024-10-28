import { Feature } from "@/models/Feature";
import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET'){
        if(req.query?.id){
            res.json(await Feature.findOne({_id:req.query.id}));
        } else {
            res.json(await Feature.find());
        }
    }

    if (method ==='POST') {
        const {titleText_1,description_1,bannerImage_1,titleText_2,description_2,bannerImage_2,titleText_3,description_3,bannerImage_3} = req.body;
        const featureDoc = await Feature.create({
            titleText_1,description_1,bannerImage_1,titleText_2,description_2,bannerImage_2,titleText_3,description_3,bannerImage_3
        })
        res.json(featureDoc);
    }

    if (method ==='PUT'){
        const {titleText_1,description_1,bannerImage_1,titleText_2,description_2,bannerImage_2,titleText_3,description_3,bannerImage_3, _id} = req.body;
       
        await Feature.updateOne({_id}, {titleText_1,description_1,bannerImage_1,titleText_2,description_2,bannerImage_2,titleText_3,description_3,bannerImage_3} );
        res.json(true);
    }

    if (method === 'DELETE'){
        if(req.query?.id){
            await Feature.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}