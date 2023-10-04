const MongoDBStore = require('connect-mongodb-session');
const session = require('express-session');

function storeSession(){
    const SessionStore = MongoDBStore(session);

    const Store = new SessionStore({
        uri: 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1',
        collection: 'mySessions',
        databaseName: 'WDE'
      });
      return Store;
}

function createSession(){
    return {
        secret: 'super secret',
        resave: false,
        saveUninitialized: false,
        store: storeSession()
    }
}

module.exports = createSession;