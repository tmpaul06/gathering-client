import io from 'socket.io-client';
import connectionStore from './stores/ConnectionStore';
export const socket = io();

socket.on('connect', function () {
  socket.on('slaveLogin', (data) => {
    connectionStore.clients[data.user.email] = data;
  });
});