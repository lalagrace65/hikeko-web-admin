import { SystemSettings } from "@/models/SystemSettings";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const settings = await SystemSettings.findOne();
        res.json(settings);
    }

    if (method === 'PUT') {
        const { systemName, systemImage } = req.body;
        const settings = await SystemSettings.findOneAndUpdate({}, {
            systemName,
            systemImage,
        }, { new: true, upsert: true });
        res.json(settings);
    }
}
