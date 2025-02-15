import { createServer } from "node:http";
import next from "next";
import arg from "arg";
import { SocketService } from "./lib/services/socket";

const dev = process.env.NODE_ENV !== "production";

const args = arg({
  '--hostname': String,
  '--port': Number,
  '-H': '--hostname',
  '-p': '--port'
}, {
  argv: process.argv.slice(2)
});

const hostname = args['--hostname'] || 'localhost';
const port = args['--port'] || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  // 确保在服务器启动前初始化Socket服务
  const io = SocketService.initialize(server);

  // 导出实例供其他模块使用
  global.socketServer = io;

  server.listen(port, hostname, () => {
    console.log(`> 服务就绪 http://${hostname}:${port}`);
  });
});