const dbConfig = {
    host: process.env.DB_HOST || 'eng-db-1',
    port: parseInt(process.env.DB_PORT || '5432'),

    database: process.env.POSTGRES_DB || 'eng',
    user: process.env.POSTGRES_USER || 'Preisler',
    password: process.env.POSTGRES_PASSWORD || 'Szives25'
};

export default dbConfig;