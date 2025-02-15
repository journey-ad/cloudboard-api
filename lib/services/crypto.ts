import CryptoJS from 'crypto-js';

/**
 * @description 加密服务
 */
export class CryptoService {
  /**
   * @description 加密数据
   * @param data 原始数据
   * @param key 密钥
   * @returns 加密后的数据
   */
  static encrypt(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  /**
   * @description 解密数据
   * @param encryptedData 加密数据
   * @param key 密钥
   * @returns 解密后的数据
   */
  static decrypt(encryptedData: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
} 