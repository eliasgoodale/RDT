export const newIndexTemplate = {
    id: "temp",
    index: "",
    location: "",
    status: "Inactive",
    lastRun: "",
    runStatus: "N/A",
    entity: "Producer",
    nextRun: "",
    tags: []
}

export const newTagTemplate = (id: string) => ({
    id: id,
    prefix: "",
    historianTag: "",
    splunkTag: ""
})