const createApp = require('./app.js')

let {router,app} = createApp({});

router.onReady(()=>{
	app.$mount('#app')
})