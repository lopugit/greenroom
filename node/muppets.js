global.env = require('minimist')(process.argv.slice(2))
global.Rollbar = require('rollbar')
global.rollbar = new Rollbar({
  accessToken: 'a8583839e0eb405fb3b598fa82daa55a',
  captureUncaught: true,
  captureUnhandledRejections: true,
	verbose: true,
	// transmit: global.env.level == 'prod'
})
require('functions')["splash.js"]()
global.logging = {
	mongoose: {
		values: false,
		write: true
	},
	timing: {

	}
}

global.secrets = require('secrets')
let muppets = require('muppets')()
let scripts = require('scripts')
let minutes = 5 

if(global.logging && global.logging.timing){
	console.log(`running scripts now, and then every ${minutes} minutes`)
}
let run = async ()=>{
	
	await scripts({muppets}).catch(err=>console.error(err))
	global.scriptsInterval = setInterval(async ()=>{
		await scripts({muppets}).catch(err=>{console.error('something went wrong running the first scripts({muppets}), ', err)})
	}, minutes * 1000 * 60)

}

run()




module.exports = muppets