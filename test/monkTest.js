process.on('uncaughtException', function (err) {
  global.logger.log('Caught exception: ', err);
});
let monk = require("monk")
let secrets = require('../node/node_modules/secrets')
let db = monk(secrets.test.monk)
let model = db.get("testModel")

;(async () => {
  await model.insert({ test: "foo" })
    .then(r => {
      global.logger.log(r)
    }).catch(e => {
      global.logger.log(e)
    })
  await model.findOneAndUpdate({ test: "foo" }, { $set: { test: "bar" } }, { upsert: true })
    .then(r => {
      global.logger.log(r)
    }).catch(e => {
      global.logger.log(e)
    })

  global.logger.log("Done")
})()
global.logger.log("running tests")
