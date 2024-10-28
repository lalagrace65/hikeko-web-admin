import mongoose, { model, models, Schema } from 'mongoose';

const TravelAgencySignUpSchema = new Schema({
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  ownerMobileNum: { type: String, required: true },
  birCertificate: { type: String, required: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  businessBranch: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
  birCertificatePhoto: { type: String, required: true },
  dtiPermitPhoto: { type: String, required: true },
  businessPermitPhoto: { type: String, required: true },
  mayorsPermitPhoto: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const TravelAgencySignUp = models?.TravelAgencySignUp || model('TravelAgencySignUp', TravelAgencySignUpSchema);
