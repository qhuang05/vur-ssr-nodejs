// 服务端这边，需要把访问的路径给到vue-router
const createApp = require('./app.js')

module.exports = (context)=>{
	return new Promise((resolve,reject)=>{
		let {router,app} = createApp(context);
		router.push(context.url);
		router.onReady(()=>{
			// 访问路径，肯定定匹配到组件
			let matchedComponents = router.getMatchedComponents();
			console.log(matchedComponents);
			if(!matchedComponents.length){
				return reject({code:404})
			}
			resolve(app)
		}, reject)
	})
}