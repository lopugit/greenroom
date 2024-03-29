function parseFunc(key, val){
	if (
		typeof val === 'string' && 
		( 
			val[val.length-1] == '}' && 
			( 
				val.slice(0,8) === 'function' || 
				val.slice(0,2) === '()' || 
				val.slice(0,5) === 'async'
			) 
		) 
	){
		return eval(`(${val})`)
	}
	return val
}
function stringifyFunc(key, val){
	if (
		typeof val === 'function' && 
		typeof val.toString === 'function'
	){
		return val.toString()
	}
	return val
}

let f = require('flatted')

let test = {
	one: 'string1',
	two: function(){},
	three(){ global.logger.log('hmm') },
	four: ()=>{},
	five: async ()=>{}
}
test.three()
test.test = test

let string = f.stringify(test, stringifyFunc)

global.logger.log('string')
global.logger.log(string)
let parsed = JSON.parse(string, parseFunc)
global.logger.log('parsed')
global.logger.log(parsed)
