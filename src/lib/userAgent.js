const userAgent = require('express-useragent')
 
module.exports = {
	isBot: function (headerUserAgent) {
		console.log(headerUserAgent)

		if (typeof headerUserAgent !== 'String' || headerUserAgent == '') {
			return ''
		}
		ua = userAgent.parse(headerUserAgent);
		return !!ua.isBot
	}
}
