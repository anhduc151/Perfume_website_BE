import dotenv from 'dotenv'
dotenv.config()


export const env = {
    MONGODB_URI : process.env.MONGODB_URI,
    APP_PORT : process.env.APP_PORT,
    APP_LOCALHOST : process.env.APP_LOCALHOST,
    APP_SECRET : process.env.APP_SECRET,
    DB_PASSWORLD : process.env.DB_PASSWORLD
}

