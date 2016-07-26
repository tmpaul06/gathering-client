/**
 * A connection store will emit events when a new client is added
 * or an existing client is removed.
 */
class ConnectionStore {
  constructor() {
    // hash map of socket id -> user details
    this.clients = {};
  }
}

export default new ConnectionStore();