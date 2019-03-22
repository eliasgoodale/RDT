
/*
{
    "id": "3389ffd",
    "enabled": true,
    "entityType": "SWD",
    "lastRun": "2017-05-04T11:30",
    "location": "Quale",
    "name": "Quale_SWD",
    "nextRun": "2017-05-24T10:30",
    "runStatus": "Success",
    "status": "Production",
    "tags": [
        "Default",
        "Default1",
        "Default2"
    ]
}
*/


function post_request_field_regularization(index: any) {
    return {
        id: "",
        enabled: index.enabled,
        entityType: index.entityType,
        lastRun: index.lastRun,
        location: index.location,
        name: index.name,
        nextRun: index.nextRun,
        runStatus: index.runStatus,
        status: index.status,
        tags: index.tags,
        eTag: index.eTag
    }
}

function update_request_field_regularization(index) {
    return {
        id: index,
        enabled: index.enabled,
        entityType: index.entityType,
        lastRun: index.lastRun,
        location: index.location,
        name: index.name,
        nextRun: index.nextRun,
        runStatus: index.runStatus,
        status: index.status,
        tags: index.tags,
        eTag: index.eTag
    }
}

function delete_request_field_regularization(index) {
    throw new Error("Not Implemented");
}


function serializeTags (tags: any) {
    return tags.map( (t: any) => {
        return t.name;
    })
}

export function transform_request_body(index: any, mode: string) {
    const toRegularize = { ...index, tags: serializeTags(index.tags) }
    switch(mode) {
        case "create":
            return post_request_field_regularization(toRegularize);
        case "update":
            return update_request_field_regularization(toRegularize);
        case "delete":
            return delete_request_field_regularization(toRegularize);
        default:
            return
    }
}