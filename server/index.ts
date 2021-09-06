import express, { Express, Request, Response } from 'express';
import http from 'http';
import next, { NextApiHandler } from 'next';
import socketio from 'socket.io';
import cors from 'cors';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();
const app: Express = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();

const messages: any[] = [];

nextApp.prepare().then(async () => {
  app.use(cors());

  io.attach(server);

  io.on('connection', (socket: socketio.Socket) => {
    socket.on('chat', (data) => {
      messages.push(data);
      socket.broadcast.emit('chat', data);
    });
  });

  app.get('/chat', (_req: Request, res: Response) => {
    res.json({ messages });
  });

  app.all('*', (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
