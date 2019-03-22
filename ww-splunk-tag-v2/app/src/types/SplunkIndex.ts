
export interface IConditional {
    eTag: string
}

export interface IndexJSON {
    [key: string]: string | boolean | string[] 
    id: string,
    enabled: boolean,
    name: string,
    location: string,
    status: string,
    lastRun: string,
    nextRun: string,
    runStatus: string,
    entityType: string,
    tags: string[],
    eTag: string,
}

export class IndexSerializer { 
    private constructor(){}

    public static encode(index: Partial<Index>): Partial<IndexJSON>
    {
        return {
            ...index.id && { id: index.id },
            ...index.enabled && { enabled: index.enabled},
            ...index.name && { name: index.name },
            ...index.location && { location: index.location },
            ...index.status && { status: index.status },
            ...index.lastRun && { lastRun: index.lastRun.toISOString() },
            ...index.nextRun && { nextRun: index.nextRun.toISOString() },
            ...index.runStatus && { runStatus: index.runStatus },
            ...index.entityType && { entityType: index.entityType },
            ...index.eTag && { eTag: index.eTag }
         }
    }

    public static decode(json: IndexJSON): Index {
        const id: string = json.id;
        const enabled: boolean = json.enabled;
        const name: string = json.name;
        const location: string = json.location;
        const status: string = json.status;
        const lastRun: Date = new Date(json.lastRun);
        const nextRun: Date = new Date(json.nextRun);
        const runStatus: string = json.runStatus;
        const entityType: string = json.entityType;
        const tags: string[] = json.tags
        const eTag: string = json.eTag;

        return new Index(
            id, enabled, name, location, status, lastRun, nextRun, runStatus, entityType, tags, eTag)
    }

}

export class Index implements IConditional {

    public constructor(
        public id: string,
        public enabled: boolean,
        public name: string,
        public location: string,
        public status: string,
        public lastRun: Date,
        public nextRun: Date,
        public runStatus: string,
        public entityType: string,
        public tags: string[],
        public eTag: string,
    )
    {}
    public encode(this: Index): IndexJSON {
        return <IndexJSON>IndexSerializer.encode(this);
    }

    public encodeOmitting(this: Index, omitProperties: string[] = []): Partial<IndexJSON> {
        const partiallyEncodedObject: any = this.encode();
        
        omitProperties.forEach((prop: string) => {
            delete partiallyEncodedObject[prop];
        })

        return partiallyEncodedObject;
    }
}

export class IndexCollection {
    
    public members: Index[];
    public serializedMembers: IndexJSON[];
    public defaultValues: IndexJSON;

    constructor(serializedInput: Partial<IndexJSON>[], defaultValues: IndexJSON) {
        this.defaultValues = defaultValues;
        this.serializedMembers = this.fillEmptyProps(serializedInput);
        this.members = this.createMembers(this.serializedMembers);
    }


    public fillEmptyProps(serializedInput: Partial<IndexJSON>[]): IndexJSON[] {
        const requiredKeys: string[] = Object.keys(this.defaultValues);

        const defaultPatchedInput: IndexJSON[] = serializedInput.map((index: any): IndexJSON => {
            requiredKeys.forEach((key: string ) => {
                index[key] = index.hasOwnProperty(key) ? index[key] : this.defaultValues[key];
            });
            return index as IndexJSON;
        });
        return defaultPatchedInput
    }

    public createMembers(serializedIndices: IndexJSON[]): Index[]
    {
        const newMembers: Index[] = serializedIndices.map((serializedIndex: IndexJSON) => {
            return IndexSerializer.decode(serializedIndex)
        });

        return newMembers;
    }
}