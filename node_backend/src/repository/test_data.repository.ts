import oracledb from 'oracledb';
import db from '../db/oracle.db';
import TestData from '../model/test_data';

export class TestDataRepository {

    async findAll() {
        const dbPool = await db;
        const conn = await dbPool.getConnection();

        try{
            const result = await conn.execute<TestData>('SELECT * FROM TESTING_TABLE WHERE DELETED = 0', [], {outFormat: oracledb.OUT_FORMAT_OBJECT});
            return result.rows as TestData[];
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{ await conn.close(); }
        
    }

    async findById(id : Number) : Promise<TestData | null> {
        const dbPool = await db;
        const conn = await dbPool.getConnection();

        try{
            const stmt = 'SELECT * FROM TESTING_TABLE WHERE ID = :id AND DELETED = 0'
            const result = await conn.execute<TestData>(stmt, [id], {outFormat: oracledb.OUT_FORMAT_OBJECT});

            if (result && result.rows && result.rows.length > 0) {
                return result.rows[0] as TestData;
            } else {
                return null;
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{ await conn.close(); }
        
    }

    async insert(testData : TestData) : Promise<any>{
        const dbPool = await db;
        const conn = await dbPool.getConnection();
        const data = testData.Data;

        try{
            const stmt = 'INSERT INTO TESTING_TABLE (DATA) VALUES (:data)';
            const result = await conn.execute<TestData>(stmt, [data], { autoCommit: true });

            if (result) {
                return result
            } else {
                return null;
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{ await conn.close(); }
    }

    async update(testData : TestData) : Promise<any>{
        const dbPool = await db;
        const conn = await dbPool.getConnection();
        const data = testData.Data;
        const id = testData.Id;

        try{
            const stmt = 'UPDATE TESTING_TABLE SET DATA = :data WHERE ID = :id';
            const result = await conn.execute<TestData>(stmt, [data, id], { autoCommit: true });

            if (result) {
                return result
            } else {
                return null;
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{ await conn.close(); }
    }

    async softDelete(testData : TestData) : Promise<any>{
        const dbPool = await db;
        const conn = await dbPool.getConnection();
        const id = testData.Id;

        try{
            const stmt = 'UPDATE TESTING_TABLE SET DELETED = 1 WHERE ID = :id';
            const result = await conn.execute<TestData>(stmt, [id], { autoCommit: true });

            if (result) {
                return result
            } else {
                return null;
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{ await conn.close(); }
    }

    

}

export default TestDataRepository;