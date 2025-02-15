import { randomBytes } from 'crypto';
import { Config } from '@/lib/config';

/**
 * @description 盐值服务
 */
export class SaltService {
  private static instance: SaltService;
  private currentSalt: string;
  private updateInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.currentSalt = this.generateSalt();
    
    if (Config.isProd) {
      this.updateInterval = setInterval(() => {
        this.currentSalt = this.generateSalt();
        console.log('Salt updated at:', new Date().toISOString());
      }, Config.salt_update_interval * 1000);
    }
  }

  /**
   * @description 获取单例实例
   */
  static getInstance(): SaltService {
    if (!SaltService.instance) {
      SaltService.instance = new SaltService();
    }
    return SaltService.instance;
  }

  /**
   * @description 生成新的盐值
   */
  private generateSalt(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * @description 获取当前盐值
   */
  getSalt(): string {
    return this.currentSalt;
  }

  /**
   * @description 清理定时器
   */
  cleanup(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
} 