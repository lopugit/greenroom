let fs = require('fs')
let path = require('path')
let Exports = []
let files = fs.readdirSync(path.join(__dirname+'/node_modules/'))

files.forEach((file)=>{
	// object
	Exports[file] = require(file)
	// array
	// Exports.push(
	// 	require(file)
	// )
})

module.exports = Exports