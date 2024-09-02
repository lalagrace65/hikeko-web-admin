import { model, Schema, models } from "mongoose";

const CouponSchema = new Schema({
    title : {type: String, required: true},
    discount: {type: Number, required: true},
    quantity: {type: Number, required: true},
});
// create a model

export const Coupons = models.Coupons|| model('Coupons',CouponSchema);