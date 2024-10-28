import mongoose, {model, Schema, models} from 'mongoose';

const ListingSchema = new mongoose.Schema({
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    createdBy: {
      type: String,  // Storing user's email address
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

export const Listing = models?.Listing || model('Listing', ListingSchema)