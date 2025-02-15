import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { ClipboardData } from "@/types";

declare global {
  // eslint-disable-next-line no-var
  var socketServer: SocketServer | undefined;
}

/**
 * Socket服务类 - 处理实时通信
 */
export class SocketService {
  private static instance: SocketServer | null = null;

  /**
   * 初始化Socket服务
   * @param httpServer - HTTP服务器实例
   */
  static initialize(httpServer: HttpServer): SocketServer {
    if (!this.instance) {
      this.instance = new SocketServer(httpServer, {
        cors: { origin: "*", methods: ["GET", "POST"] }
      });
      this.setupEventHandlers();
      console.log('Socket服务初始化成功');
    }
    return this.instance;
  }

  /**
   * 设置Socket事件处理器
   */
  private static setupEventHandlers(): void {
    if (!this.instance) return;

    this.instance.on('connection', socket => {
      console.log('客户端已连接:', socket.id);

      const handlers = {
        auth: (key: string) => {
          socket.rooms.forEach(room => room !== socket.id && socket.leave(room));
          socket.join(key);
          console.log(`客户端认证key: ${key}, 房间成员:`,
            this.instance?.sockets.adapter.rooms.get(key)?.size ?? 0);
        },

        'clipboard:sync': ({ key, data }: { key: string, data: ClipboardData }) => {
          console.log('收到clipboard:sync事件 - Socket ID:', socket.id);
          this.instance?.to(key).emit('clipboard:sync', data);
        },

        disconnect: (reason: string) => {
          console.log('客户端断开连接:', socket.id, '原因:', reason);
        }
      };

      // 注册所有事件处理器
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    });
  }

  /**
  * 向指定房间广播数据
  * @param key - 房间标识
  * @param data - 要广播的数据
  */
  static broadcastToRoom(key: string, data: unknown, sourceId?: string): void {
    const io = global.socketServer;
    if (!io) return console.error('Socket服务尚未初始化');

    const room = io.sockets.adapter.rooms.get(key);
    if (!room || room.size === 0) {
      // console.log('房间为空，跳过广播');
      return;
    }

    console.log(`广播到房间: ${key}, 成员数: ${room.size}`);

    if (sourceId) {
      const socket = io.sockets.sockets.get(sourceId);
      if (socket) {
        socket.broadcast.to(key).emit('clipboard:sync', data);
        return;
      }
    }

    io.to(key).emit('clipboard:sync', data);
  }
}