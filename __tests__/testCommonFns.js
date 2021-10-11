/* para que funcione el test en el CommonFns.js hay que cambiar:
 * 
 * export default CommonFns;
 * 
 * por
 * const commonFns=new CommonFns();
 * module.exports = commonFns;
 * 
 */

const commonFns = require ('../src/components/js/CommonFns.js')
describe ('cleanText', () => {
	// BEGIN: passing empty data
	test ('passed undefined', () => {
		expect (commonFns.cleanText ()).toBe ('')
	})

	test ('passed empty string', () => {
		expect (commonFns.cleanText ('')).toBe ('')
	})

	test ('passed false', () => {
		expect (commonFns.cleanText (false)).toBe ('')
	})
	test ('passed break line', () => {
		expect (commonFns.cleanText ("\n")).toBe ('')
	})
	// END: passing empty data
	
	// BEGIN: is working?
	test ('passed text with spaces', () => {
		expect (commonFns.cleanText (" hola ")).toBe ("hola")
	})
	// END: is working?
})

describe ('formatDate', () => {
	test ('passed undefined', () => {
		expect (commonFns.formatDate ()).toBe ('')
	})

 	test ('passed bad dateFormat', () => {
 		expect (commonFns.formatDate (1633105330,'tete')).toBe ('')
 	})
 
 	test ('passed negative timeUnix', () => {
 		expect (commonFns.formatDate (-1,'sp')).toBe ('')
 	})
        test ('passed negative NaN', () => {                                                                                                                                                               
                expect (commonFns.formatDate ('trrs','sp')).toBe ('')                                                                                                                                               
        })
})
