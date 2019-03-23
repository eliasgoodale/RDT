import {
    rowClick,
    changeSort,
    showModal,
    cancelChanges,
    collectionCreate, 
    collectionUpdate, 
    collectionGetAll,
    indicesGridEnterCreate,
    indicesGridExitCreate,
    indicesGridChangeSort,
    hideModal,
    editGridItem,
    createTag,
    deleteTag,
    deleteAllTags,

} from './actions';


const ActionsTable = {
    "collection": {
        "create": collectionCreate,
        "update": collectionUpdate,
        "getAll": collectionGetAll
    },
    "indicesGrid": {
        "changeSort": changeSort("indicesGrid"),
        "enterCreate": indicesGridEnterCreate,
        "exitCreate": indicesGridExitCreate,
        "rowClick": rowClick("indicesGrid")
    },
    "detailsModal": {
        "cancelChanges": cancelChanges("detailsModal"),
        "hideModal": hideModal("detailsModal"),
        "showModal": showModal("detailsModal"),
        "rowClick": rowClick("detailsModal"),
    },
    "tagsGrid": {
        "create": createTag,
        "changeSort": changeSort("tagsGrid"),
        "delete": deleteTag,
        "deleteAll": deleteAllTags,
        "editGridItem": editGridItem("tagsGrid"),
        "rowClick": rowClick("tagsGrid")
    }
}

export default ActionsTable;