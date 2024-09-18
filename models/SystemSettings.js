import { Schema, model, models } from 'mongoose';

const SystemSettingsSchema = new Schema({
    systemName: { type: String, required: true },
    systemImage: { type: String, required: true }, // URL or base64 image string
});

export const SystemSettings = models.SystemSettings || model('SystemSettings', SystemSettingsSchema);
