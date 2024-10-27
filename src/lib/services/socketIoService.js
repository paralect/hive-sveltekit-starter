import currentUser from '$lib/stores/currentUser';

import io from 'socket.io-client';
import config from '$lib/config';

const socket = io(config.apiDomain, {
  transports: ['websocket'],
  autoConnect: false
});

export const connect = async () => {
  socket.open();
};

export const disconnect = () => {
  socket.disconnect();
};

export const emit = (event, ...args) => {
  socket.emit(event, ...args);
};

export const on = (event, callback) => {
  socket.on(event, callback);
};

export const off = (event, callback) => {
  socket.off(event, callback);
};

export const connected = () => socket.connected;

export const disconnected = () => socket.disconnected;

let currentUserId = null;

socket.on('connect', () => {
  currentUser.subscribe((user) => {
    if (user) {
      if (user._id !== currentUser) {
        currentUserId = user._id;

        console.log('subscribed', `user-${currentUserId}`);

        emit('subscribe', `user-${currentUserId}`);

        if (currentUserId && currentUserId !== user._id) {
          emit('unsubscribe', `user-${currentProjectId}`);
        }
      }
    } else {
      if (currentUserId) {
        emit('unsubscribe', `project-${currentUserId}`);
      }
      currentUserId = null;
    }
  });
});
