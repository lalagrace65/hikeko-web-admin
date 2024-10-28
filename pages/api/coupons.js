import {Coupons} from "@/models/Coupon";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET'){
        if(req.query?.id){
            res.json(await Coupons.findOne({_id:req.query.id}));
        } else {
            res.json(await Coupons.find());
        }
    }

    if (method ==='POST') {
        const {title, discount, quantity} = req.body;
        const couponDoc = await Coupons.create({
            title, discount, quantity
        })
        res.json(couponDoc);
    }

    if (method ==='PUT'){
        const {title, discount, quantity, _id} = req.body;
       
        await Coupons.updateOne({_id}, {title, discount, quantity} );
        res.json(true);
    }

    if (method === 'DELETE'){
        if(req.query?.id){
            await Coupons.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}