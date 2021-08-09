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

console.log(`[muppets][info] Started Muppets, env: `, global.env)

let muppets = require('muppets')()
let scripts = require('scripts')
let minutes = 1.2

console.log(`[muppets][info] running scripts now, and then every ${minutes} minutes`)
let run = async ()=>{
	let lastRun = new Date()
	let nextRun = new Date(lastRun.getTime() + (minutes * 1000 * 60))

	setInterval(()=>{
		console.log("[muppets][info][scheduler] Running next script in", Math.floor((nextRun.getTime() - new Date().getTime()) / (1000 * 60)), "minutes", Math.floor((nextRun.getTime() - new Date().getTime()) / 1000 % 60), "seconds")
	}, 10000)
	
	global.scriptsInterval = setInterval(async ()=>{
		lastRun = nextRun
		nextRun = new Date(lastRun.getTime() + (minutes * 1000 * 60))
		console.log("[muppets][info][scheduler] Running script again at", new Date())
		await scripts({muppets}).catch(err=>{console.error('[muppets][error] something went wrong running the first scripts({muppets}), ', err)})
	}, minutes * 1000 * 60)
	
	await scripts({muppets}).catch(err=>console.error(err))
}

run()




module.exports = muppets