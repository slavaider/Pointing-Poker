import React, { FormEvent, useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';

const Test: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState<any>([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('chat', (data: any) => {
        setMessages((prev: any) => [...prev, data]);
      });
    }
  }, [socket]);

  function submit(e: FormEvent) {
    e.preventDefault();

    if (socket)
      socket.emit('chat', {
        id: new Date().getTime(),
        value: message,
      });
  }

  return (
    <>
      <form onSubmit={submit}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>submit</button>
      </form>
      <ul>
        {messages.map((msg: any) => (
          <li key={msg.id}>{msg.value}</li>
        ))}
      </ul>
    </>
  );
};
export default Test;
