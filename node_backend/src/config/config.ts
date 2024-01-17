import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'dev.env') });

interface AppConfig {
    NODE_ENV: string;
    HOST: string;
    PORT: number | string;
    db: DbConfig;
}

interface DbConfig {
    user: string | undefined;
    password: string | undefined;
    connectString: string | undefined;
}

const config: AppConfig = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,

    db: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING
    }
}

export default config;