import * as Joi from 'joi'
import { orderBy } from '@progress/kendo-data-query'

const indexSchema = Joi.object().keys({
    id: Joi.string(),
    selected: Joi.boolean(),
    enabled: Joi.boolean(),
    name: Joi.string().min(2).max(30),
    location: Joi.string().min(2).max(30),
    status: Joi.string().valid(["Production", "Test", "Inactive"]),
    lastRun: Joi.string(),
    runStatus: Joi.string().valid(["Success", "Failure", "N/A"]),
    entityType: Joi.string().valid(["Producer", "SWD"]),
    nextRun: Joi.string(),
    tags: Joi.array(),
    eTag: Joi.string().allow("").optional()
})

const tagSchema = Joi.object().keys({
    id: Joi.string(),
    name: Joi.string().min(1),
    tagInEdit: Joi.boolean(),
})

const validateIndex = (index: any) => {
    const result = Joi.validate(index, indexSchema)
    console.log(result)
    return result
} 

const validateTag = (tag: any) => {
    const result = Joi.validate(tag, tagSchema)
    console.log(result)
    return result
}

const generateTags = (tags: any) => {
    return tags.map((t: any) => {
        if (t.splunkTag === "") {
            console.log(t)
            t.splunkTag = t.historianTag.replace(t.prefix, "")
        }
        return t
    })
}

const sortActive = (data: any, sort: any) => {
    return orderBy(data.filter((index: any) => index.enabled === true), sort)

}

const sortTags = (tags: any, sort: any) => {
    return orderBy(tags, sort);
}

export {
    generateTags,
    sortActive,
    sortTags,
    validateIndex,
    validateTag,
}
    