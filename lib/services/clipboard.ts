import { clipboardCache } from '../cache';
import { ClipboardData } from '@/types';
import { CryptoService } from './crypto';
import { pbkdf2Sync } from 'crypto';
import { SaltService } from './salt';
import { Config } from '@/lib/config';
import bs58 from 'bs58';

/**
 * @description 剪贴板服务
 */
export class ClipboardService {
  private static readonly ITERATIONS = 10000;
  private static readonly saltService = SaltService.getInstance();

  /**
   * @description 获取密钥对应的哈希值
   * @param key 密钥
   */
  private static getKeyHash(key: string): string {
    const currentSalt = this.saltService.getSalt();
    return bs58.encode(pbkdf2Sync(
      key,
      currentSalt,
      this.ITERATIONS,
      34,
      'sha256'
    ));
  }

  /**
   * @description 获取剪贴板数据
   * @param encryptionKey 加密密钥
   */
  static getClipboard(encryptionKey: string): ClipboardData | null {
    const keyHash = this.getKeyHash(encryptionKey);
    const clipboard = clipboardCache.get(keyHash);
    
    if (!clipboard) return null;
    
    try {
      const decryptedContent = CryptoService.decrypt(clipboard.content, encryptionKey);
      return { ...clipboard, content: decryptedContent };
    } catch (error) {
      console.error('解密失败:', error);
      return null;
    }
  }

  /**
   * @description 创建新的剪贴板数据
   * @param content 内容
   * @param encryptionKey 加密密钥
   * @param type 内容类型
   */
  static createClipboard(content: string, encryptionKey: string, type: 'text' | 'file' = 'text'): ClipboardData {
    const keyHash = this.getKeyHash(encryptionKey);
    const encryptedContent = CryptoService.encrypt(content, encryptionKey);
    
    const clipboardData: ClipboardData = {
      content: encryptedContent,
      type,
      timestamp: Date.now() / 1000 | 0
    };

    clipboardCache.set(keyHash, clipboardData);
    return { ...clipboardData, content };
  }

  /**
   * @description 验证内容大小
   */
  static validateContentSize(content: string): boolean {
    return Buffer.byteLength(content, 'utf8') <= Config.clipboard_size;
  }
} 