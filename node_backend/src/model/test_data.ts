export class TestData { 

    public Id : Number;
    public Data : String;
    
    constructor(public id : Number, data: String) {
        this.Id = id;
        this.Data = data;
    }
};

export default TestData;