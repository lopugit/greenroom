let fs = require('fs')
let files = fs.readdirSync(__dirname+'/node_modules')
let schemas = {}

module.exports = function(args){
	for(var file of files){
		if(file.indexOf('ignore') < 0) {
			let schemaName = file.replace(/.js/, '')
			schemas[schemaName] = require(file)
		}
	}
	return schemas
}