const dbConfig = {
    host: process.env.DB_HOST || 'calendar-db-1',
    port: parseInt(process.env.DB_PORT || '5432'),

    database: process.env.POSTGRES_DB || 'calendar',
    user: process.env.POSTGRES_USER || 'Petrik',
    password: process.env.POSTGRES_PASSWORD || 'Petrik23'
};

export default dbConfig;