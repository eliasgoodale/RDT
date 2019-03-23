import { IndexCollection } from '../types/SplunkIndex';
import { defaultTemplate } from '../types';
import HttpClient from '../utils/client'

/**
 * HttpClient Configuration
 */
const client = new HttpClient({ baseURL: "http://localhost:5000" })
client.createEntity({ name: 'indexes' })

/**
 * Collection Setup
 */
const indexCollection = new IndexCollection(defaultTemplate);

export {
    client,
    indexCollection
}