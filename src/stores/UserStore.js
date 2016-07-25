import { socket } from '../socket';

class UserStore {
  constructor() {
    this.userName = undefined;
    this.userEmail = undefined;
  }
}

let userStore = new UserStore();

socket.on('connect', () => {
  console.log(socket);
  userStore.userId = socket.id;
});

socket.on('disconnect', () => {
  userStore.userId = undefined;
});

export default userStore;