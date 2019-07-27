// nodejs将vue实例转成html结构渲染到页面
const server = require('express')()
const Vue = require('vue')
const vueRenderer = require('vue-server-renderer').createRenderer()

// 在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染 (cross-request state pollution),
// 因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例
const createApp = (context)=>{
	return new Vue({
		data:{
			message: 'Hello, vue-ssr',
			url: context.url
		},
		template: `<div>
			<div>{{message}}</div>
			<div>您当前访问的路径是：{{url}}</div>
		</div>`
	})
}

server.get('*', (req,res)=>{
	res.status(200);
  	res.setHeader('Content-Type', 'text/html;charset=utf-8;')

	let app = createApp({url: req.url})
	// renderToString返回一个promise对象
	vueRenderer.renderToString(app).then((html)=>{
		res.end(`<!DOCTYPE html>
			<html>
				<head>
				    <meta charset="utf-8">
				    <meta name="viewport" content="width=device-width,initial-scale=1.0">
				    <title>vue-ssr-cli-webpack-nodejs</title>
			  	</head>
			  	<body>${html}</body>
			</html>`);
	}).catch(error=>console.log(error));
})

server.listen(9000, ()=>{
	console.log('启动成功');
})