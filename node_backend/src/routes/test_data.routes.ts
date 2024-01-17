import { Express } from 'express';
import TestDataController from '../controller/test_data.controller';

export class TestDataRoutes{

    
    private testDataController = new TestDataController();
    
    constructor(){
        this.testDataController = new TestDataController();
    }

    public register(app: Express): void {
        app.get('/test_data', this.testDataController.findAll.bind(this.testDataController));
        app.get('/test_data/:id', this.testDataController.findById.bind(this.testDataController));
        app.post('/test_data', this.testDataController.create.bind(this.testDataController));
        app.put('/test_data/:id', this.testDataController.update.bind(this.testDataController));
        app.delete('/test_data/:id', this.testDataController.softDelete.bind(this.testDataController));
    }

}

export default TestDataRoutes;
