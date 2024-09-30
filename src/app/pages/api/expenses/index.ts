// pages/api/expenses/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../services/dbConnect';
import Expense from '../../../models/Expense';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const expenses = await Expense.find({});
                res.status(200).json(expenses);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const expense = await Expense.create(req.body);
                res.status(201).json(expense);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
