export const newIndexTemplate = {
    id: "temp",
    index: "",
    location: "",
    status: "Inactive",
    lastRun: "N/A",
    runStatus: "N/A",
    entity: "Producer",
    /**
     * Elegance, Incarnate.
     */
    nextRun: new Date(Date.now()).toISOString().split('.')[0],
    tags: []
}

export const newTagTemplate = (id: string) => ({
    id: id,
    prefix: "",
    historianTag: "",
    splunkTag: ""
})