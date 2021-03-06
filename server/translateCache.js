const Cache = require('lru-cache-node');

//intializing database with 10 rows (developer can change according to memory provided)
const cache = new Cache(10);

function cacheData(req,res,next)
{
    //if req is not GET
    if(req.method !== 'GET') {
        console.error('Cannot cache non-GET methods!');
        return next();
    }

    //check if key exists in cache
    const key = req.originalUrl;
    const cacheResponse = cache.get(key);

    //if exists, send cache result
    if(cacheResponse) {
        console.log('Cache hit for ' + `${key}`);
        res.send(cacheResponse);
    } else {
        //if not, replace ,send with method to  set response to cache
        console.log('Cache miss for ' + `${key}`);
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body);
        };
        return next();
    }
}

//exporitng cacheData function to be used by translate.js
module.exports = cacheData;
