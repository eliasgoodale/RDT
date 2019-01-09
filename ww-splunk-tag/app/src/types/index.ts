export const newIndexTemplate = {
    id: "temp",
    isActive: true,
    index: "",
    location: "",
    status: "Inactive",
    lastRun: "",
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