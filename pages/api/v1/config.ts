import { NextApiRequest, NextApiResponse } from 'next';
import { Config } from '@/lib/config';

async function getConfig() {
  return {
    version: 1001,
    max_cache_items: Config.max_cache_items,
    max_cache_size: Config.max_cache_size,
    clipboard_type: Config.clipboard_type,
    clipboard_size: Config.clipboard_size,
    clipboard_ttl: Config.clipboard_ttl
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const config = await getConfig();
    res.status(200).json(config);
  } catch (error) {
    console.error('获取配置失败:', error);
    res.status(500).json({ error: '获取配置失败' });
  }
}
