import 'dotenv/config'
import postgres from 'postgres'

const database = process.env.DATABASE_URL || 'postgresql://docker:docker@localhost:5432/shortlinks'
const isProduction = process.env.NODE_ENV === 'production'
const config = {
    ssl: {
        rejectUnauthorized: false,
    }
}

export const sql = postgres(database, isProduction ? config : {})
