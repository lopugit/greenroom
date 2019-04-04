require('puppeteer').launch()
.then(b => {
	return b.newPage()
	.then(p => {
		return p
	})
})
.then(p => {
	return p.goto("https://www.mars-hydro.com/led-grow-light?limit=25")
	.then(a => {
		return p
	})
})
.then(p => {
	return p.waitForSelector('#products-list').then(el=>{return {el,p}})
})
.then(o=>{
	return o.p.evaluateHandle(target=>{ 
		return document.querySelector('#products-list').children
	})
})
.then(console.log) // nothing
.catch(console.error)