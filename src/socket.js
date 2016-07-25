import io from 'socket.io-client';
export const socket = io();

socket.on('connect', function () {
  socket.on('userLoggedIn', function(data) {
    console.log('Received login data', data);
  });
});