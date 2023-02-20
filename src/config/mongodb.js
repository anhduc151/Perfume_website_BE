
import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://anhdev:cAKYYCL9oIykIHcp@cluster0.0chveyu.mongodb.net/?retryWrites=true&w=majority'

let dbInstance = null

export const connectDB = async ()=> {
    const client = new MongoClient(uri)
    
    await client.connect()
    
    dbInstance = client.db('perfume-app')
}

export const getDB = () =>{
    if(!dbInstance) throw new Error('Must be connect to Database first!')
    return dbInstance
}

