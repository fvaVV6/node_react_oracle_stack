import Joi from 'joi';

const testDataSchema = Joi.object({
    id: Joi.number().when('operation', {
        is: Joi.valid('update', 'delete', 'findById'),
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
    data: Joi.string().when('operation', {
        is: 'create',
        then: Joi.required(),
        otherwise: Joi.optional()
    })
}).unknown();

export default testDataSchema;
