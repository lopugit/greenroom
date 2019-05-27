let s = require('smarts')()

let test = {
	one: 'string1',
	two: function(){},
	three(){ console.log('hmm') },
	four: ()=>{},
	five: async ()=>{}
}
console.log('test')
console.log(test)
let test2 = s.dupe(test)
console.log('test2')
console.log(test2)
