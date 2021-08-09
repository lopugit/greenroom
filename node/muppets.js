global.env = require('minimist')(process.argv.slice(2))
global.Rollbar = require('rollbar')
global.secrets = require('secrets')
if (global.env.level == "prod") {
	global.rollbar = new Rollbar({
		accessToken: global.secrets.rollbar.key,
		captureUncaught: true,
		captureUnhandledRejections: true,
		verbose: true,
		environment: global.env.level == 'prod' ? 'production' : 'development'
	})
}
// catches all uncaught errors so process never dies
process.on("uncaughtException", function (err) {
  console.log("[muppets][error] Caught exception: ", err);
});
require('functions')["splash.js"]()
global.logging = {
	mongoose: {
		values: false,
		write: true
	},
	timing: {

	}
}

console.log(`[muppets][info] Started Muppets, env: `, global.env)

let muppets = require('muppets')()
let scripts = require('scripts')
let minutes = 5 

if(global.logging && global.logging.timing){
	console.log(`[muppets][info] running scripts now, and then every ${minutes} minutes`)
}
let run = async ()=>{
	
	await scripts({muppets}).catch(err=>console.error(err))
	global.scriptsInterval = setInterval(async ()=>{
		await scripts({muppets}).catch(err=>{console.error('[muppets][error] something went wrong running the first scripts({muppets}), ', err)})
	}, minutes * 1000 * 60)

}

run()




module.exports = muppets