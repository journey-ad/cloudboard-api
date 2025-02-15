import { LRUCache } from 'lru-cache';
import { ClipboardData } from '@/types';
import { Config } from '@/lib/config';
/**
 * @description 剪贴板缓存配置
 */
const options = {
  max: Config.max_cache_items,
  maxSize: Config.max_cache_size, // 转换为字节
  ttl: Config.clipboard_ttl * 1000, // 单条过期时间
  ttlAutopurge: true,
  sizeCalculation: (value: ClipboardData) => {
    // 计算整个对象的大小
    return Buffer.byteLength(JSON.stringify(value), 'utf8');
  },
}

/**
 * @description 剪贴板缓存实例
 */
export const clipboardCache = new LRUCache<string, ClipboardData>(options);

// setInterval(() => {
//   console.log(`size: ${clipboardCache.size}`);
//   clipboardCache.forEach((value, key) => {
//     console.log(`key: ${key}, value: ${JSON.stringify(value)}`);
//   });
// }, 5000);
