// @ts-nocheck
import express, {Express} from 'express';
import http from 'http';
import next, {NextApiHandler} from 'next';
import socketio from 'socket.io';
import cors from 'cors';
import IUser from '../src/interfaces/user';
import IMessage from '../src/interfaces/message';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler: NextApiHandler = nextApp.getRequestHandler();
const app: Express = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();

const messages = {};
const users = {};
const options = {};
const titles = {};
const issues = {};
const cards = {};

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
                users[user.room].push(newUser);
            } else {
                Object.assign(users, {[user.room]: [newUser]});
                Object.assign(messages, {[user.room]: []});
            }

            socket.broadcast.to(user.room).emit('add user', newUser);

            return cb(users[user.room], messages[user.room], newUser);
        });

        socket.on('add user', (user, cb) => {
            cb(user);
        });

        socket.on('send message', (message: IMessage, cb) => {
            messages[message.room].push(message);
            socket.broadcast.to(message.room).emit('add message', message);
            cb(messages[message.room]);
        });

        socket.on('add message', (message, cb) => {
            cb(message);
        });

        socket.on('send option', (option: IMessage, cb) => {
            options[option.room].push(option);
            socket.broadcast.to(option.room).emit('add option', option);
            cb(options[option.room]);
        });

        socket.on('add option', (option, cb) => {
            cb(option);
        });

        socket.on('send title', (title: IMessage, cb) => {
            titles[option.room] = title;
            socket.broadcast.to(title.room).emit('add title', title);
            cb(titles[title.room]);
        });

        socket.on('add title', (title, cb) => {
            cb(title);
        });

        socket.on('send issue', (issue: IMessage, cb) => {
            issues[issue.room].push(issue);
            socket.broadcast.to(issue.room).emit('add issue', issue);
            cb(issues[issue.room]);
        });

        socket.on('add issue', (issue, cb) => {
            cb(issue);
        });

        socket.on('send card', (card: IMessage, cb) => {
            cards[issue.room].push(card);
            socket.broadcast.to(card.room).emit('add card', card);
            cb(cards[card.room]);
        });

        socket.on('add card', (card, cb) => {
            cb(card);
        });
    });

    app.all('*', (req: any, res: any) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
