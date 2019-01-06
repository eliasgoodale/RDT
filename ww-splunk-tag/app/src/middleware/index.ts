import * as Joi from 'joi'

const indexSchema = Joi.object().keys({
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

const tagSchema = Joi.object().keys({
    id: Joi.string(),
    prefix: Joi.string().min(1),
    historianTag: Joi.string().min(1),
    splunkTag: Joi.string(),
    tagInEdit: Joi.boolean(),
})

const validateIndex = (index: any) => {
    const result = Joi.validate(index, indexSchema);
    console.log(result);
    return result;
} 

const validateTag = (tag: any) => {
    const result = Joi.validate(tag, tagSchema);
    console.log(result);
    return result;
}

export { 
    validateIndex,
    validateTag,
}
    