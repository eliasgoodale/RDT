import * as Joi from 'joi'

const schema = Joi.object().keys({
    id: Joi.string(),
    index: Joi.string().min(2).max(30),
    location: Joi.string().min(2).max(30),
    status: Joi.string().valid(["Production", "Test", "Inactive"]),
    lastRun: Joi.date().required(),
    runStatus: Joi.string().valid(["Success", "Failure", "N/A"]),
    entity: Joi.string().valid(["Producer", "SWD"]),
    nextRun: Joi.date().required(),
    tags: Joi.array() 
})

const validate = index => Joi.validate(index, schema) 

export default validate