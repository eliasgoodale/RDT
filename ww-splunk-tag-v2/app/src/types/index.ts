import { IndexJSON } from './SplunkIndex';

export const newIndexTemplate = {
    id: "temp",
    enabled: true,
    name: "",
    location: "",
    status: "Inactive",
    // No modify on create
    lastRun: "N/A",
    // No modify on create
    runStatus: "N/A",
    entityType: "Producer",
    nextRun: new Date(Date.now()).toISOString().split('.')[0],
    tags: []
}

export const defaultTemplate: IndexJSON = {
    id: "temp",
    enabled: false,
    name: "",
    location: "",
    status: "Inactive",
    lastRun: "N/A",
    runStatus: "N/A",
    entityType: "Producer",
    nextRun: "N/A",
    tags: [""],
    eTag: ""
}

export const newTagTemplate = (id: string) => ({
    id: id,
    name: ""
})