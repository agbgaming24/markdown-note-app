import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

redis.on('error', (err) => console.log('Redis error:', err.message))

export const limit = async (req, res, next) => {
  try {
    const max = parseInt(process.env.RATE_LIMIT_MAX)
    const window = parseInt(process.env.RATE_LIMIT_WINDOW)
    const key = req.ip

    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, window)
    }

    if (current > max) {
      return res.status(429).json({ message: 'Too many requests' })
    }

    next()
  } catch (err) {
    next()
  }
}