import express, {Express} from 'express';
import http from 'http';
import next, {NextApiHandler} from 'next';
import socketio from 'socket.io';
import cors from 'cors';
import IUser from "../src/interfaces/user";
import IMessage from "../src/interfaces/message";
// import IMessage from "../src/interfaces/message";

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler: NextApiHandler = nextApp.getRequestHandler();
const app: Express = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();

const messages = {};
const users = {};

nextApp.prepare().then(async () => {
    app.use(cors());

    io.attach(server);

    io.on('connection', (socket: socketio.Socket) => {
        socket.on('join server', (user: IUser, cb) => {
            const newUser = {
                ...user,
                userId: socket.id,
            };
            socket.join(user.room);
            if (Object.prototype.hasOwnProperty.call(users, user.room)) {
                // @ts-ignore
                users[user.room].push(newUser);
            } else {
                Object.assign(users, {[user.room]: [newUser]});
                Object.assign(messages, {[user.room]: []});
            }
            socket.broadcast.to(user.room).emit('add user', newUser);
            // @ts-ignore
            return cb(users[user.room], messages[user.room], newUser);
        });

        socket.on('add user', (user, cb) => {
            cb(user);
        });

        socket.on('send message', (message: IMessage, cb) => {
            // @ts-ignore
            messages[message.room].push(message);
            socket.broadcast.to(message.room).emit('add message', message);
            // @ts-ignore
            cb(messages[message.room])
        });

        socket.on('add message', (message, cb) => {
            cb(message);
        });
    });

    app.all('*', (req: any, res: any) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
