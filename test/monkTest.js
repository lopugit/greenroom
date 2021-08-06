process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});
let monk = require("monk")
let db = monk("mongodb+srv://lopu:6AwswYsfVke8IwUz@thingtime.nobn0.mongodb.net/growtime")
let model = db.get("testModel")

;(async () => {
  await model.insert({ test: "foo" })
    .then(r => {
      console.log(r)
    }).catch(e => {
      console.log(e)
    })
  await model.findOneAndUpdate({ test: "foo" }, { $set: { test: "bar" } }, { upsert: true })
    .then(r => {
      console.log(r)
    }).catch(e => {
      console.log(e)
    })

  console.log("Done")
})()
console.log("running tests")
