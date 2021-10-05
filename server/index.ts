// @ts-nocheck
import express, {Express} from 'express';
import http from 'http';
import next, {NextApiHandler} from 'next';
import socketio from 'socket.io';
import cors from 'cors';
import User from '../src/interfaces/user';
import Message from '../src/interfaces/message';
import {Options} from "../src/interfaces/options";
import Issue from "../src/interfaces/issue";
import Card from "../src/interfaces/card";

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
        socketId: socket.id,
        userId: socket.id,
      };
      socket.join(room);

      if (Object.prototype.hasOwnProperty.call(users, room)) {
        users[room].push(newUser);
      } else {
        users[room] = [newUser];
        messages[room] = [];
        options[room] = {
          timerValue: '02:20',
          playable: true,
          swap: true,
          timer: true,
          scoreType: 'story point',
          scoreTypeShort: 'SP',
        };
        titles[room] = 'Spring 23 planning...';
        issues[room] = [];
        cards[room] = [];
      }

      socket.broadcast.to(room).emit('send user server', newUser);

      return cb(
        users[room],
        messages[room],
        options[room],
        issues[room],
        cards[room],
        titles[room],
        newUser);
    });

    socket.on('send user server', (user, cb) => {
      cb(user);
    });
    
    socket.on('remove user', (userData: User, room, cb) => {
      const userIndex = users[room].findIndex((item) => item.userId === userData.userId)
      socket.leave(room);
      users[room].splice(1, userIndex);
      socket.broadcast.to(room).emit('remove user server', userData);
      cb(userData);
    });

    socket.on('remove user server', (user, cb) => {
      cb(user);
    });

    socket.on('update user', (userData: User, room, cb) => {
      const userIndex = users[room].findIndex((item) => item.userId === userData.userId)
      users[room][userIndex] = {...userData}
      socket.broadcast.to(room).emit('update user server', userData);
      cb(userData);
    });

    socket.on('update user server', (user, cb) => {
      cb(user);
    });

    // MESSAGES

    socket.on('send message', (message: Message, cb) => {
      messages[message.room].push(message);
      socket.broadcast.to(message.room).emit('send message server', message);
      cb(message);
    });

    socket.on('send message server', (message, cb) => {
      cb(message);
    });

    // OPTIONS

    socket.on('send option', (option: Options, room, cb) => {
      options[room] = option;
      socket.broadcast.to(room).emit('send option server', option);
      cb(option);
    });

    socket.on('send option server', (option, cb) => {
      cb(option);
    });

    // TITLE

    socket.on('send title', (title: string, room, cb) => {
      titles[room] = title;
      socket.broadcast.to(room).emit('send title server', title);
      cb(title);
    });

    socket.on('send title server', (title, cb) => {
      cb(title);
    });

    // ISSUES

    socket.on('send issue', (issue: Issue, room, cb) => {
      issues[room].push(issue);
      socket.broadcast.to(room).emit('send issue server', issue);
      cb(issue);
    });

    socket.on('send issue server', (issue, cb) => {
      cb(issue);
    });

    socket.on('issue remove', (issueId: string, room, cb) => {
      const toDelete = issues[room].findIndex((item) => item.id === issueId);
      issues[room].splice(toDelete, 1);
      socket.broadcast.to(room).emit('issue remove server', issueId);
      cb(issueId);
    });

    socket.on('issue remove server', (id, cb) => {
      cb(id);
    });

    socket.on('issue update', (issue: Issue, room, cb) => {
      const toUpdate = issues[room].findIndex((item) => item.id === issue.id);
      issues[room][toUpdate] = issue
      socket.broadcast.to(room).emit('issue update server', issue);
      cb(issue);
    });

    socket.on('issue update server', (issue, cb) => {
      cb(issue);
    });

    // CARDS

    socket.on('send card', (card: Card, room, cb) => {
      cards[room].push(card);
      socket.broadcast.to(room).emit('add card', card);
      cb(card);
    });

    socket.on('send card server', (card, cb) => {
      cb(card);
    });

    socket.on('card remove', (cardId: string, room, cb) => {
      const toDelete = cards[room].findIndex((item) => item.id === cardId);
      cards[room].splice(toDelete, 1);
      socket.broadcast.to(room).emit('card remove server', cardId);
      cb(cardId);
    });

    socket.on('card remove server', (id, cb) => {
      cb(id);
    });

    socket.on('card update', (card: Card, room, cb) => {
      const toUpdate = cards[room].findIndex((item) => item.id === card.id);
      cards[room][toUpdate] = card
      socket.broadcast.to(room).emit('card update server', card);
      cb(card);
    });

    socket.on('card update server', (card, cb) => {
      cb(card);
    });

    // GAME

    socket.on('start game', (usersData: User[], room, cb) => {
      users[room] = usersData.map((item) => {
        item.status = 'idle';
        return item;
      });
      socket.broadcast.to(room).emit('start game server', usersData);
      cb(usersData);
    });

    socket.on('start game server', (users, cb) => {
      cb(users);
    });


    socket.on('kick player', (userId: string, user: User, split, cb) => {

      const userIndex = users[user.room].findIndex(
        (item) => item.userId === userId,
      );

      if (userIndex !== -1) {
        users[user.room][userIndex].kickVotes += 1;
        users[user.room][userIndex].allVotes += 1;
        socket.broadcast.to(user.room).emit('update user server', users[user.room][userIndex]);
      }

      if (users[user.room][userIndex].kickVotes === users[user.room].length - 1) {
        users[user.room].splice(userIndex, 1);
      }

      if (split) socket.broadcast.to(user.room).emit('kick player server', userId, user);

      cb(userId);
    });

    socket.on('kick player server', (userId, user, cb) => {
      cb(userId, user);
    });

  });

  app.all('*', (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
