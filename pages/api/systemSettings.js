import { SystemSettings } from "@/models/SystemSettings";
import { mongooseConnect } from "@/lib/mongoose";
import { isSuperAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isSuperAdminRequest(req, res);

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
