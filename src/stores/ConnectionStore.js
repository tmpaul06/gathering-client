import { EventEmitter } from 'events';
/**
 * A connection store will emit events when a new client is added
 * or an existing client is removed.
 */
const CHANGE_EVENT = 'group-connection-update';

class ConnectionStore extends EventEmitter {
  constructor() {
    super();
    // hash map of socket id -> user details
    this.clients = {};
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default new ConnectionStore();