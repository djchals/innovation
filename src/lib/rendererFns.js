const userAgent = require('express-useragent')
const fs = require ('fs')
const path = require ('path')

module.exports = {
	isBot: function (headerUserAgent) {
		if (typeof headerUserAgent !== 'String' || headerUserAgent == '') {
			return false
		}
		ua = userAgent.parse(headerUserAgent);
		return !!ua.isBot
	},
	isInCache: function (actPath) {
		const pathCacheDB='cache/cacheDB.json'
		if(!fs.existsSync(pathCacheDB)) {
			return false
		}

		const fileCacheDB = fs.readFileSync(pathCacheDB, {encoding:'utf8', flag:'r'})
		const cacheDB = JSON.parse(fileCacheDB)

		const indexElement = cacheDB.findIndex(element => element == actPath)
		
		// if findIndex() doesnt found the actPath in the cache, it will returns -1, but I want it returns false
		// if findIndex() found the path it will returns the cacheFileName	
		if (indexElement==-1){
			return false
		} else {
			const cacheFileName = indexElement.toString()
			return cacheFileName
		} 

	},
	getCacheFileContent: function (cacheFileName) {
		const contentCacheFileName =  fs.readFileSync(path.join('cache',cacheFileName), {encoding:'utf8', flag:'r'})
		return contentCacheFileName
	}
}
