import { useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/auth';

// Socket.IO only works in development (not on Vercel serverless)
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
const isProduction = import.meta.env.PROD;

export function useSocket(onClickEvent) {
  const { user } = useAuthStore();

  useEffect(() => {
    // Skip socket connection in production (Vercel doesn't support WebSocket)
    if (isProduction || !user) return;

    const socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('join', user.id);
    });

    socket.on('click', (data) => {
      console.log('Click event:', data);
      if (onClickEvent) onClickEvent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, onClickEvent]);
}
