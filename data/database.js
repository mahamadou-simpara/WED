const mongodb = require('mongodb');

let database;

async function connectDB(){

    try{

        const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1');
    
        const connect = await client.connect();
        database = connect.db('WDE');
    }catch(error){
        console.error('Error connecting to the database:', error);
    }

};


function getDB(){
    if(!database){
        throw new Error('Failed to establish connection!')
    }
    return database;
}


module.exports = {
    connectDB: connectDB,
    getDB: getDB
}


