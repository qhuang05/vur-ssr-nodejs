const Vue = require('vue')
const createRouter = require('./router')

module.exports = (context)=>{
	let router = createRouter();
	let app = new Vue({
		router,
		data:{
			message: 'Hello, vue-ssr',
			url: context.url
		},
		template: `<div>
			<div>{{message}}</div>
			<div>您当前访问的路径是：{{url}}</div>
			<router-link to="/">home</router-link>
			<router-link to="/about">about</router-link>
			<router-view></router-view>
		</div>`
	});
	return {router, app}
}