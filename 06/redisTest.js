let redis = require('redis')


async function x (){
  const client = await redis.createClient({
    url: 'redis://127.0.0.1:6379'
  })
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
      await client.del(process.argv[2]);
      const value = await client.get('key');
  await client.disconnect();
}


x();