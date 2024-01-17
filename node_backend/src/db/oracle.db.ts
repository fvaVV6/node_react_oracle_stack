import oracledb from 'oracledb';
import config from '../config/config';

const connectionParameters = {
    user: config.db.user,
    password: config.db.password,
    connectString: config.db.connectString,
};

async function initPool(): Promise<oracledb.Pool> {
    try{
        await oracledb.createPool({ ...connectionParameters });
        return oracledb.getPool();
    } catch (err){
        console.error("err getting pool = " + err);
        throw err;
    }
};

const db = initPool();

export default db;
