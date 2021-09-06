import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (url: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, [url]);

  return socket;
};
export default useSocket;
