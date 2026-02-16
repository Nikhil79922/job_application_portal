import {createClient} from 'redis'

export const redisClient=createClient({
    url:process.env.Redis_url
})