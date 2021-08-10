global.env = require('minimist')(process.argv.slice(2))
global.Rollbar = require('rollbar')
global.secrets = require('secrets')
global.logger = require('logger')
/** Logging */
setInterval(() => {
	global.logger.log("[muppets][info] Still alive, arguments were", global.env)
}, 5000);
// rollbar config
global.rollbar = new global.Rollbar({
	accessToken: global.secrets.rollbar.key,
	captureUncaught: false,
	captureUnhandledRejections: false,
	verbose: true,
	environment: global.env.level == 'prod' ? 'production' : 'development'
})
// catches all uncaught errors so process never dies
process.on("uncaughtException", function (err) {
  global.logger.log("[muppets][uncaughtException][error]", err);
});
require('functions')["splash.js"]()

global.logger.log(`[muppets][info] Started Muppets, env:`, global.env)

let { DateTime } = require('luxon')
let smarts = require('smarts')()
let scripts = require('scripts');
let minutes = 1.2

let scheduler = async ()=>{

	setInterval(schedule, 5000)

	function schedule () {
		for (let script of scripts) {
			let timeNow = DateTime.now()

			let nextRun = smarts.gosmart(script, "nextRun", timeNow)			
			let schedule = smarts.gosmart(script, "schedule", { minutes: 5 })
			
			let timeDiff = nextRun.diff(timeNow, "minutes").minutes
			
			let nextRunTimeDiff = script.nextRun.diff(timeNow)
			let nextRunTimeDiffFormatted = nextRunTimeDiff.toFormat("m 'minutes, 's' seconds'")
			if (timeDiff <= 0) {
				let newNextRun = timeNow.plus(schedule)
				smarts.setsmart(script, "nextRun", newNextRun)
				let newNextRunTimeDiff = script.nextRun.diff(timeNow)
				let newNextRunTimeDiffFormatted = newNextRunTimeDiff.toFormat("m 'minutes, 's' seconds'")
				if (script.enabled) {
					global.logger.log("[muppets][scheduler][info] Running script now, and then in", newNextRunTimeDiffFormatted, "Script name:", script.name)
					script.run()
				} else {
					global.logger.log("[muppets][scheduler][info] Script disabled, not running, will run in", newNextRunTimeDiffFormatted, "Script name:", script.name)
				}
			} else {
				global.logger.log("[muppets][scheduler][info] Don't need to run yet. Will run in", nextRunTimeDiffFormatted, "Script name:", script.name)
			}
			
		}
	}
	
}

scheduler()
