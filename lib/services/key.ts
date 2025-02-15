import { randomBytes, pbkdf2Sync } from 'crypto';

/**
 * @description 密钥服务
 */
export class KeyService {
  private static readonly SALT_LENGTH = 16;
  private static readonly KEY_LENGTH = 32;
  private static readonly ITERATIONS = 10000;

  /**
   * @description 从用户输入的密码生成加密密钥
   * @param password 用户密码
   * @returns 派生密钥和盐值
   */
  static deriveKey(password: string): { derivedKey: string; salt: string } {
    const salt = randomBytes(this.SALT_LENGTH).toString('hex');
    const derivedKey = this.generateKey(password, salt);
    return { derivedKey, salt };
  }

  /**
   * @description 使用已有的盐值重新生成密钥
   * @param password 用户密码
   * @param salt 盐值
   */
  static generateKey(password: string, salt: string): string {
    return pbkdf2Sync(
      password,
      salt,
      this.ITERATIONS,
      this.KEY_LENGTH,
      'sha256'
    ).toString('hex');
  }
} 