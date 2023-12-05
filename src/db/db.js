import { Client } from 'postgres';
import dbConfig from './dbconfig';
 
const connectToDB = async () =>{
    const client = new Client({
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password
    });
 
    await client.connect();
 
    return client;
}
 
const disconnectFromDB = async (client) => {
    await client.end();
    return;
}
 
const q = async (client, query) => {
    let res = await client.query(query);
    return res;
}
 
export {
    connectToDB,
    disconnectFromDB,
    q
};