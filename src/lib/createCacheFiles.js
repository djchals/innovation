const { curly } = require('node-libcurl');
const fs = require ('fs')
const path = require ('path')

class createCacheFiles {
	constructor(params) {
		this.urlOriginBase = params.urlOriginBase
		this.paths = params.paths
		this.outputFolder = params.outputFolder
		this.DB = []
	}
	renderAllPaths(){
		//check if exists all the params

		//check if is array paths
		let numPaths = this.paths.length
		let cacheDB = []
		for( let iPath = 0; iPath < numPaths; iPath++ ) {
			(async () => {
				let cacheContent = await this.getContentURL (this.paths[iPath])
				this.writeCacheFile (iPath.toString(), cacheContent)
				// console.log('dentro')
			})();
			cacheDB[iPath] = this.paths[iPath]
		}
	}
	async getContentURL(actPath) {
		const url = path.join(this.urlOriginBase, actPath)
		const { statusCode, data } = await curly.get(url)

		//if url exists return data
		return data
	}

	writeCacheFile(cacheFileName, cacheContent) {
		const actFile = path.join(this.outputFolder,cacheFileName) 
		console.log(actFile)

		fs.writeFile (actFile, cacheContent, function (err) {
			if (err) {
				return console.log(err)
			}
			console.log (actFile + ' saved')
		});
	}
}

const simple = new createCacheFiles({
	urlOriginBase: 'https://autoexaming.com',
	paths: ['/'],
	outputFolder: 'cache'
})
simple.renderAllPaths()
