/**
 * @description 剪贴板数据类型
 */
export interface ClipboardData {
  content: string;
  type: 'text' | 'file';
  timestamp: number;
}

/**
 * @description 用户类型
 */
export interface User {
  id: string;
  lastActive: number;
}