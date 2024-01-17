import testDataSchema from '../../joi/test_data.validation';
import TestData from '../model/test_data';
import TestDataRepository from '../repository/test_data.repository';
import { Request, Response } from 'express';

export class TestDataController {
    
    private repo = new TestDataRepository;

    async findAll(req : Request, res : Response) : Promise<Response> {

        console.log('listation!');
        try{
            const testData = await this.repo.findAll();
            return res.status(200).json(testData);

        }catch(err){
            console.error(err);
            return res.status(500).send("something went wrong fetching the testdata! :(");
        }
    }

    async findById(req : Request, res : Response) : Promise<Response> {

        console.log('findation!');
        try{
            const id = parseInt(req.params.id);
            const testData = await this.repo.findById(id);

            const { error } = testDataSchema.validate({ ...req.body, operation: 'findById'});

            if (error) { return res.status(400).send('validation error!! ' + error.details[0].message); }

            if(testData){
                return res.status(200).json(testData);
            }else{
                return res.status(404).send('we havent found nothin');
            }

        }catch(err){
            console.error(err);
            return res.status(500).send("something went wrong fetching the testdata! :(");
        }
    }

    async create(req : Request, res : Response) : Promise<Response> {
        
        console.log('creation!');
        try{

            const { error } = testDataSchema.validate({ ...req.body, operation: 'create' });
            if (error) { return res.status(400).send('validation error!! ' + error.details[0].message); }

            const data = req.body;
            const result = await this.repo.insert(new TestData(0, data.data));

            return res.status(201).json(result);

        }catch(err){
            console.error(err);
            return res.status(500).send("couldnt insert data!");
        }


    }

    async update(req : Request, res : Response) : Promise<Response> {
        
        console.log('updation!');
        try{

            const { error } = testDataSchema.validate({ ...req.body, operation: 'update'});
            if (error) { return res.status(400).send('validation error!! ' + error.details[0].message); }

            const data = req.body;
            const result = await this.repo.update(new TestData(parseInt(req.params.id), data.data));

            return res.status(201).json(result);

        }catch(err){
            console.error(err);
            return res.status(500).send("couldnt update data!");
        }


    }

    async softDelete(req : Request, res : Response) : Promise<Response> {
        
        console.log('deletion!');
        try{
            const { error } = testDataSchema.validate({ ...req.body, operation: 'delete'});
            if (error) { return res.status(400).send('validation error!! ' + error.details[0].message); }

            const result = await this.repo.softDelete(new TestData(parseInt(req.params.id), ''));
            
            if(result){
                return res.status(200).json('deleted TestData with ID [' + req.params.id + ']');
            }else{
                return res.status(404).send('we havent found nothin');
            }

        }catch(err){
            console.error(err);
            return res.status(500).send("couldnt delete data!");
        }


    }

}

export default TestDataController;