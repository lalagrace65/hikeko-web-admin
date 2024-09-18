import mongoose, { model, Schema, models } from "mongoose";

const TrailSchema = new Schema({
    title : {type: String, required: true},
    description: String,
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties:{type:Object},
    price: {type: Number, required: true},
    trailClass: {type: Number, required: true},
    difficultyLevel: {type: Number, required: true},
    elevation: {type: Number, required: true},
    trailImages: [{type:String}],
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
},{
    timestamps: true,
});
// create a model
export const Trails = models.Trails || model('Trails',TrailSchema);