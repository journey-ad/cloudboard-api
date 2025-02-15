import { sizeToBytes } from "./utils";

/**
 * @description 应用配置
 */
export class Config {
  /**
   * @description 运行环境
   */
  static get env(): string {
    return process.env.NODE_ENV || 'development';
  }

  /**
   * @description 是否为生产环境
   */
  static get isProd(): boolean {
    return this.env === 'production';
  }

  /** 
   * @description 剪贴板缓存最大条目数
   * @default 500
   */
  static get max_cache_items(): number {
    return Number(process.env.MAX_CACHE_ITEMS) || 500;
  }

  /**
   * @description 剪贴板缓存总大小
   * @default 100MB
   */
  static get max_cache_size(): number {
    return sizeToBytes(process.env.MAX_CACHE_SIZE || '100MB');
  }

  /**
   * @description 剪贴板支持的内容类型
   * @default ['text', 'html', 'rtf', 'image']
   */
  static get clipboard_type(): string[] {
    return process.env.CLIPBOARD_TYPE?.split(',') || ['text', 'html', 'rtf', 'image'];
  }

  /**
   * @description 内容大小限制
   * @default 5MB
   */
  static get clipboard_size(): number {
    return sizeToBytes(process.env.CLIPBOARD_SIZE || '5MB');
  }

  /**
   * @description 剪贴板数据缓存时间（秒）
   * @default 600 (10分钟)
   */
  static get clipboard_ttl(): number {
    return Number(process.env.CLIPBOARD_TTL) || 600;
  }

  /**
   * @description 盐值更新间隔（秒）
   * @default 3600 (1小时)
   */
  static get salt_update_interval(): number {
    return Number(process.env.SALT_UPDATE_INTERVAL) || 3600;
  }
} 