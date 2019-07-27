const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

// 每次请求都是新的router
module.exports = ()=>{
	return new VueRouter({
		mode: 'history',
		routes:[
			{
				path: '/',
				name: 'home',
				component:{
					template: `<div>这是首页</div>`
				}
			},
			{
				path: '/about',
				name: 'about',
				component:{
					template: `<div>这是关于我</div>`
				}
			}
		]
	})
}
