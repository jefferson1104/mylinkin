import 'dotenv/config'
import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://:docker@localhost:6379'

export const redis = createClient({
    url: redisUrl
})

redis.connect()
