import Redis from 'ioredis';

// Global variable to cache the Redis connection across Lambda invocations
// This prevents creating a new connection for every function call
let redisClient: Redis | null = null;

export const getRedisClient = (): Redis => {
    if (redisClient) {
        return redisClient;
    }

    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        throw new Error('REDIS_URL environment variable is not defined');
    }

    redisClient = new Redis(redisUrl, {
        // Retry strategy for robustness
        retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        // Serverless optimization: Don't keep the event loop alive
        // This allows Lambda to freeze the process properly if needed
        // However, for typical persistent connections, we might want to keep it open.
        // Setting enableAutoPipelining: true can improve performance.
        enableAutoPipelining: true,
    });

    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
        console.log('Redis Client Connected');
    });

    return redisClient;
};

// Export the Redis type for consumers
export { Redis };
