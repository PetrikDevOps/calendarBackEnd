import pkg from 'pg';
const { Client } = pkg;

export default class dbService {
    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST || 'calendar-db-1',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.POSTGRES_DB || 'calendar',
            user: process.env.POSTGRES_USER || 'Petrik',
            password: process.env.POSTGRES_PASSWORD || 'Petrik23'
        });
    }

    connectToDB = async () => {
        try {
            await this.client.connect();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
        }
    }

    query = async (query) => {
        try {
            await this.connectToDB();
            const result = await this.client.query(query);
            return result;
        } catch (error) {
            console.error('Error executing query:', error.message);
        } finally {
            await this.client.end();
            console.log('Disconnected from the database');
        }
    }
}
