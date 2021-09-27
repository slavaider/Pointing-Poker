// @ts-nocheck
import express, {Express} from 'express';
import http from 'http';
import next, {NextApiHandler} from 'next';
import socketio from 'socket.io';
import cors from 'cors';
import User from '../src/interfaces/user';
import Message from '../src/interfaces/message';
import {Options} from "../src/interfaces/options";

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

        socket.on('join server', (user: User, cb) => {
            const room = user.room;
            const newUser = {
                ...user,
                userId: socket.id,
            };
            socket.join(room);

            if (Object.prototype.hasOwnProperty.call(users, room)) {
                users[room].push(newUser);
            } else {
                users[room]  = [newUser]
                messages[room] = []
                options[room] = {
                    timerValue:'02:20',
                    playable: true,
                    swap: true,
                    timer: true,
                    scoreType: 'story point',
                    scoreTypeShort: 'SP',
                }
                // TODO: other sockets
                Object.assign(titles, {[room]: []});
                Object.assign(issues, {[room]: []});
                Object.assign(cards, {[room]: []});
            }

            socket.broadcast.to(room).emit('add user', newUser);

            return cb(users[room], messages[room],options[room], newUser);
        });

        socket.on('add user', (user, cb) => {
            cb(user);
        });

        socket.on('send message', (message: Message, cb) => {
            messages[message.room].push(message);
            socket.broadcast.to(message.room).emit('add message', message);
            cb(messages[message.room]);
        });

        socket.on('add message', (message, cb) => {
            cb(message);
        });

        socket.on('send option', (option: Options, room, cb) => {
            options[room] = option;
            socket.broadcast.to(room).emit('add option', option);
            cb(options[room]);
        });

        socket.on('add option', (option, cb) => {
            cb(option);
        });

        socket.on('send title', (title: Message, room, cb) => {
            titles[room] = title;
            socket.broadcast.to(room).emit('add title', title);
            cb(titles[room]);
        });

        socket.on('add title', (title, cb) => {
            cb(title);
        });

        socket.on('send issue', (issue: Message, room, cb) => {
            issues[room].push(issue);
            socket.broadcast.to(room).emit('add issue', issue);
            cb(issues[room]);
        });

        socket.on('add issue', (issue, cb) => {
            cb(issue);
        });

        socket.on('send card', (card: Message, room, cb) => {
            cards[room].push(card);
            socket.broadcast.to(room).emit('add card', card);
            cb(cards[room]);
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
