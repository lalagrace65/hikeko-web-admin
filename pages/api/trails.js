import {Trails} from "@/models/Trail";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isSuperAdminRequest } from "./auth/[...nextauth]";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isSuperAdminRequest(req, res);

    if (method === 'GET'){
        if(req.query?.id){
            res.json(await Trails.findOne({_id:req.query.id}));
        } else {
            res.json(await Trails.find());
        }
    }

    if (method ==='POST') {
        const {title,category,properties, description, price, trailClass, difficultyLevel, elevation, trailImages, coordinates} = req.body;
        const trailDoc = await Trails.create({
            title, category, properties, description, price, trailClass, difficultyLevel, elevation, trailImages, coordinates
        })
        res.json(trailDoc);
    }

    if (method ==='PUT'){
        const {title,category, properties, description, price, trailClass, difficultyLevel, elevation, trailImages, coordinates, _id} = req.body;
       
        await Trails.updateOne({_id}, {title, category, properties, description, price, trailClass, difficultyLevel, elevation, trailImages, coordinates} );
        res.json(true);
    }

    if (method === 'DELETE'){
        if(req.query?.id){
            await Trails.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}