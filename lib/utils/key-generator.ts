import { randomBytes } from 'crypto';
import bs58 from 'bs58';

/**
 * @description 密钥生成器
 */
export class KeyGenerator {
  private static readonly KEY_LENGTH = 34;
  private static readonly KEY_REGEX = /^[1-9A-HJ-NP-Za-km-z]{46}$/;

  /**
   * @description 生成随机密钥
   * @returns 带前缀的base58编码密钥
   */
  static generate(): string {
    const bytes = randomBytes(this.KEY_LENGTH);
    return bs58.encode(bytes);
  }

  /**
   * @description 验证密钥格式
   * @param key 待验证的密钥
   */
  static validate(key: string): boolean {
    return this.KEY_REGEX.test(key);
  }
} 