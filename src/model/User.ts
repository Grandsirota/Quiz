// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../services/dbConnect';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const user = await User.create(req.body);
                res.status(201).json(user);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
