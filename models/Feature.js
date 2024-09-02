import { model, Schema, models } from "mongoose";

const FeatureSchema = new Schema({
    
    titleText_1:{type: String},
    description_1:{type: String},
    bannerImage_1:[{type:String}],
    titleText_2:{type: String},
    description_2:{type: String},
    bannerImage_2:[{type:String}],
    titleText_3:{type: String},
    description_3:{type: String},
    bannerImage_3:[{type:String}],
});
// create a model
export const Feature = models.Feature || model('Feature',FeatureSchema);