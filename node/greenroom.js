global.env = require('minimist')(process.argv.slice(2))
global.greenroom = {
	actors: {}
}
global.secrets = require('secrets')
global.logger = require('logger')
/** Logging */
setInterval(() => {
	global.logger.log("[greenroom][alive][info] Still alive, arguments were", global.env)
}, 5000);
// catches all uncaught errors so process never dies
process.on("uncaughtException", function (err) {
  global.logger.log("[greenroom][uncaughtException][error]", err);
});
require('functions')["splash.js"]()

global.logger.log(`[greenroom][info] Started Green room, env:`, global.env)

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
					global.logger.log("[greenroom][scheduler][info] Running script now, and then in", newNextRunTimeDiffFormatted, "Script name:", script.name)
					script.run()
				} else {
					global.logger.log("[greenroom][scheduler][info] Script disabled, not running, will run in", newNextRunTimeDiffFormatted, "Script name:", script.name)
				}
			} else {
				global.logger.log("[greenroom][scheduler][info] Don't need to run yet. Will run in", nextRunTimeDiffFormatted, "Script name:", script.name)
			}
			
		}
	}
	
}

scheduler()
