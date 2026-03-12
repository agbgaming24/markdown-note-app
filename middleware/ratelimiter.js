import Redis from "ioredis";

const redis=new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT
});

export const limit=async (req,res,next)=>{
    const limit=process.env.RATE_LIMIT_MAX;
    const window=process.env.RATE_LIMIT_WINDOW;

    const key=req.ip;

    const current=await redis.incr(key);

    if(current===1){
        await redis.expire(key,window);
    }
    if(current>limit){
        return res.status(429).json({message:'Too many requests'})
    }
    next();
}