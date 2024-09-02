import { model, Schema, models } from "mongoose";

const TravelAgencySchema = new Schema({
    travelAgencyName : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required:true},
    location: {type: String, required: true},
    businessPermit: [{type:String, required:true}],
    birCertificate: [{type:String, required:true}],
    dtiPermit: [{type:String, required:true}],
    mayorPermit: [{type:String, required:true}],
});
// create a model

export const TravelAgency = models.TravelAgency || model('TravelAgency',TravelAgencySchema);