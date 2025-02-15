import { NextApiRequest, NextApiResponse } from 'next';
import { ClipboardService } from '@/lib/services/clipboard';
import { Config } from '@/lib/config';
import { SocketService } from '@/lib/services/socket';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { key } = req.query;
    if (!key) {
      return res.status(400).json({ error: '缺少必要参数 `key`' });
    }

    const clipboardData = ClipboardService.getClipboard(key as string);
    const ttl = clipboardData ? (clipboardData?.timestamp ?? 0) + Config.clipboard_ttl - Date.now() / 1000 | 0 : 0;
    return res.status(200).json({ code: 200, msg: 'success', data: clipboardData, ttl });
  }


  if (req.method === 'POST') {
    try {
      const { content, key, type = 'text', clientId: sourceId } = req.body;

      if (!content || !key) {
        return res.status(400).json({
          code: -1,
          msg: '缺少必要参数 `content` 或 `key`'
        });
      }

      if (!Config.clipboard_type.includes(type)) {
        return res.status(400).json({
          code: -2,
          msg: `不支持的内容类型, 当前启用类型: ${Config.clipboard_type.join(',')}`
        });
      }

      if (!ClipboardService.validateContentSize(content)) {
        return res.status(400).json({
          code: -3,
          msg: `内容超出大小限制, 当前限制: ${Config.clipboard_size}`
        });
      }

      const clipboardData = await ClipboardService.createClipboard(content, key, type);

      // 广播到key对应房间
      SocketService.broadcastToRoom(key, clipboardData, sourceId);

      return res.status(200).json({
        code: 200,
        msg: 'success',
        ttl: Config.clipboard_ttl
      });
    } catch (error) {
      console.error('更新剪贴板失败:', error);
      return res.status(500).json({
        code: 500,
        msg: '服务器错误'
      });
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10MB"
    }
  },
};
