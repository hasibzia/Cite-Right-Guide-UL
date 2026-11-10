import type { Request, Response } from 'express';
import { formatULHarvardReference } from '../src/utils/ulHarvardFormatter';

export default async function handler(req: any, res: any) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const rawInput = body.rawInput;

    if (!rawInput || typeof rawInput !== 'string' || !rawInput.trim()) {
      return res.status(400).json({
        success: false,
        message: 'No reference input provided.',
      });
    }

    const formattedItem = formatULHarvardReference(rawInput);

    return res.status(200).json({
      success: true,
      results: [formattedItem],
      message: 'Formatted using University of Limerick Harvard reference engine.',
    });
  } catch (error: any) {
    console.error('API format error:', error);
    return res.status(500).json({
      success: false,
      message: 'Formatting error',
    });
  }
}
