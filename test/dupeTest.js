let s = require('smarts')()

let test = {
	one: 'string1',
	two: function(){},
	three(){ global.logger.log('hmm') },
	four: ()=>{},
	five: async ()=>{}
}
global.logger.log('test')
global.logger.log(test)
let test2 = s.dupe(test)
global.logger.log('test2')
global.logger.log(test2)
