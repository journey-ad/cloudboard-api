import { NextApiRequest, NextApiResponse } from 'next';
import { KeyGenerator } from '@/lib/utils/key-generator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const key = KeyGenerator.generate();
    res.status(200).json({ key });
  } catch (error) {
    console.error('生成密钥失败:', error);
    res.status(500).json({ error: '生成密钥失败' });
  }
}
